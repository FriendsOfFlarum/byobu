<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Discussion;

use Flarum\Discussion\Discussion;
use Flarum\Discussion\Event\Saving;
use Flarum\Group\Group;
use Flarum\User\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Arr;
use Illuminate\Support\Fluent;
use Illuminate\Support\Str;

/**
 * @property Saving|null        $event
 * @property Collection|User[]  $currentUsers
 * @property Collection|Group[] $currentGroups
 * @property Collection|User[]  $users
 * @property Collection|Group[] $groups
 */
class Screener extends Fluent
{
    public function fromDiscussion(Discussion $discussion): Screener
    {
        $screener = new self();

        /** @phpstan-ignore-next-line */
        $screener->users = $screener->currentUsers = $discussion->recipientUsers;
        /** @phpstan-ignore-next-line */
        $screener->groups = $screener->currentGroups = $discussion->recipientGroups;

        return $screener;
    }

    /**
     * Whether the discussion is a byobu private discussion, without loading
     * its recipients when it can't be one.
     *
     * is_private alone doesn't identify one: flarum/approval and others set it
     * too. But GetModelIsPrivate sets it on every save of a discussion that has
     * recipients, so a stored discussion that isn't private has none. Policies
     * and serialised fields ask this of every discussion in a response,
     * including those reached through another resource's include, which aren't
     * eager loaded with their recipients.
     *
     * Not for computing is_private itself: that's GetModelIsPrivate.
     */
    public function isPrivateDiscussion(Discussion $discussion): bool
    {
        // Strictly false: a discussion loaded without the column is checked
        // by its recipients.
        if ($discussion->exists && $discussion->is_private === false) {
            return false;
        }

        return $this->fromDiscussion($discussion)->isPrivate();
    }

    public function whenSavingDiscussions(Saving $event): Screener
    {
        $screener = new self();
        /** @phpstan-ignore-next-line */
        $screener->currentUsers = $event->discussion->recipientUsers;
        /** @phpstan-ignore-next-line */
        $screener->currentGroups = $event->discussion->recipientGroups;

        $screener->users = static::getRecipientsFromPayload($event, 'users');
        $screener->groups = static::getRecipientsFromPayload($event, 'groups');

        $screener->event = $event;

        return $screener;
    }

    public function actor(): ?User
    {
        return $this->event->actor ?? null;
    }

    public function nothingChanged(): bool
    {
        $nothingChanged = true;

        foreach (['users', 'groups'] as $type) {
            foreach (['added', 'deleted'] as $action) {
                if ($this->{$action}($type)->isNotEmpty()) {
                    return false;
                }
            }
        }

        return $nothingChanged;
    }

    public function isPrivate(): bool
    {
        return $this->users->isNotEmpty() || $this->groups->isNotEmpty();
    }

    public function wasPrivate(): bool
    {
        return $this->currentUsers->isNotEmpty() || $this->currentGroups->isNotEmpty();
    }

    protected function getRecipientsFromPayload(Saving $event, string $type): Collection
    {
        $data = Arr::get(
            $event->data,
            'relationships.'.static::relationName($type).'.data',
            []
        );

        /** @phpstan-ignore-next-line */
        $ids = collect($data)->pluck('id');

        if ($type === 'groups') {
            return Group::query()->whereIn('id', $ids)->get();
        }

        return User::query()->whereIn('id', $ids)->get();
    }

    final public static function relationName(string $type): string
    {
        return 'recipient'.Str::ucfirst($type);
    }

    public function hasBlockingUsers(): bool
    {
        return $this->users
            ->reject(function (User $user) {
                // Reject currentUsers and allow the actor to create PDs even if they block incoming new PDs
                return $this->currentUsers->contains($user) || ($user->id === $this->actor()?->id);
            })
            ->first(function (User $user) {
                return boolval($user->blocks_byobu_pd);
            }) !== null;
    }

    public function deleted(string $type): Collection
    {
        if ($type === 'groups') {
            return $this->currentGroups->diff($this->groups);
        }

        return $this->currentUsers->diff($this->users);
    }

    public function added(string $type): Collection
    {
        if ($type === 'groups') {
            return $this->groups->diff($this->currentGroups);
        }

        return $this->users->diff($this->currentUsers);
    }

    public function actorRemoved(): bool
    {
        return $this->deleted('users')->find($this->actor()) !== null;
    }

    public function onlyActorRemoved(): bool
    {
        // Actor hasn't been removed.
        if (!$this->actorRemoved()) {
            return false;
        }
        // More than just the actor removed.
        if ($this->deleted('users')->count() > 1) {
            return false;
        }
        // Users were added.
        if ($this->added('users')->count() > 0) {
            return false;
        }
        // Groups were removed.
        if ($this->deleted('groups')->count() > 0) {
            return false;
        }
        // Groups were added.
        if ($this->added('groups')->count() > 0) {
            return false;
        }

        return true;
    }

    public function makingPublic(): bool
    {
        $id = Arr::get($this->event->data, 'attributes.public');

        if ($id && (int) $id === $this->event->discussion->id) {
            return true;
        }

        return false;
    }
}
