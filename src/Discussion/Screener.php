<?php

namespace FoF\Byobu\Discussion;

use Flarum\Discussion\Event\Saving;
use Flarum\Group\Group;
use Flarum\User\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Arr;
use Illuminate\Support\Fluent;
use Illuminate\Support\Str;

/**
 * @property Saving $event
 * @property Collection|User[] $currentUsers
 * @property Collection|Group[] $currentGroups
 * @property bool $wasPrivate
 * @property Collection|User[] $users
 * @property Collection|Group[] $groups
 * @property bool $isPrivate
 * @property bool $nothingChanged
 * @property User $actor
 */
class Screener extends Fluent
{
    public static function whenSavingDiscussions(Saving $event): Screener
    {
        $screener = new Self;
        $screener->currentUsers = $event->discussion->recipientUsers()->get();
        $screener->currentGroups = $event->discussion->recipientGroups()->get();
        $screener->wasPrivate = $screener->currentUsers->isNotEmpty() || $screener->currentGroups->isNotEmpty();

        $screener->users = static::getRecipientsFromPayload($event, 'users');
        $screener->groups = static::getRecipientsFromPayload($event, 'groups');
        $screener->isPrivate = $screener->users->isNotEmpty() || $screener->groups->isNotEmpty();

        $screener->nothingChanged = $screener->users->diff($screener->currentUsers)->isEmpty()
            && $screener->groups->diff($screener->currentGroups)->isEmpty();

        $screener->actor = $event->actor;
        $screener->event = $event;

        return $screener;
    }

    protected static function getRecipientsFromPayload(Saving $event, string $type): Collection
    {
        $ids = collect(Arr::get(
            $event->data,
            "relationships.".static::relationName($type).".data",
            []
        ))->pluck('id');

        if ($type === 'groups') {
            return Group::query()->whereIn('id', $ids)->get();
        }

        return User::query()->whereIn('id', $ids)->get();
    }

    protected static function relationName(string $type)
    {
        return "recipient" . Str::ucfirst($type);
    }

    public function hasBlockingUsers(): bool
    {
        return $this->users
            ->first(function (User $user) {
                return $user->getPreference('blocksPd', false);
            }) !== null;
    }

    public function deleted(string $type)
    {
        if ($type === 'groups') {
            return $this->currentGroups->diff($this->groups);
        }

        return $this->currentUsers->diff($this->users);
    }

    public function added(string $type)
    {
        if ($type === 'groups') {
            return $this->groups->diff($this->currentGroups);
        }

        return $this->users->diff($this->currentUsers);
    }

    public function actorRemoved(): bool
    {
        return $this->deleted('users')->find($this->actor) !== null;
    }
}
