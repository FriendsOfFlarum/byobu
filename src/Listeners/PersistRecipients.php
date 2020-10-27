<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Listeners;

use Carbon\Carbon;
use Flarum\Discussion\Discussion;
use Flarum\Discussion\Event\Saving;
use Flarum\User\Exception\PermissionDeniedException;
use Flarum\User\User;
use FoF\Byobu\Discussion\Screener;
use FoF\Byobu\Events;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Support\Str;

class PersistRecipients
{
    /**
     * @var Screener
     */
    protected $screener;

    public function handle(Saving $event)
    {
        /** @var Screener $screener */
        $screener = app('byobu.screener');
        $this->screener = $screener->whenSavingDiscussions($event);

        if ($this->screener->nothingChanged()) {
            return;
        }

        if ($event->actor->cannot('startPrivateDiscussionWithBlockers') && $this->screener->hasBlockingUsers()) {
            throw new PermissionDeniedException('Not allowed to add users that blocked receiving private discussions');
        }

        if (!$event->discussion->exists) {
            $this->checkPermissionsForNewDiscussion($event->actor);
        } else {
            $this->checkPermissionsForExistingDiscussion($event->actor, $event->discussion);
        }

        // Private discussions that used to be private but no longer have any recipients
        // now by default will be soft deleted/hidden.
        // The Deleting event is dispatched, if a listener interferes with by returning
        // a non-null response the discussion will not be soft deleted.
        if ($this->screener->wasPrivate() && !$this->screener->isPrivate()) {
            /** @var Dispatcher $events */
            $events = app(Dispatcher::class);
            $eventArgs = $this->eventArguments($event->discussion);

            if ($events->until(new Events\Deleting(...$eventArgs)) === null) {
                $event->discussion->hide($event->actor);
            }
        }

        $this->raiseEvent($event->discussion);

        $event->discussion->afterSave(function (Discussion $discussion) {
            foreach (['users', 'groups'] as $type) {
                $relation = 'recipient'.Str::ucfirst($type);

                $discussion->{$relation}()->saveMany(
                    $this->screener->deleted($type),
                    ['removed_at' => Carbon::now()]
                );

                $discussion->{$relation}()->saveMany(
                    $this->screener->added($type),
                    ['removed_at' => null]
                );
            }
        });
    }

    protected function eventArguments(Discussion $discussion): array
    {
        return [
            $discussion,
            $this->screener->actor(),
            $this->screener->users->pluck('id'),
            $this->screener->groups->pluck('id'),
            $this->screener->currentUsers->pluck('id'),
            $this->screener->currentGroups->pluck('id'),
        ];
    }

    protected function raiseEvent(Discussion $discussion)
    {
        $args = $this->eventArguments($discussion);

        if ($this->screener->isPrivate() && !$discussion->exists) {
            $event = new Events\Created(...$args);
        } elseif ($this->screener->actorRemoved()) {
            $event = new Events\RemovedSelf(...$args);
        } else {
            $event = new Events\RecipientsChanged(...$args);
        }

        $discussion->raise($event);
    }

    protected function checkPermissionsForNewDiscussion(User $user)
    {
        if ($this->screener->users->isNotEmpty() && $user->cannot('discussion.startPrivateDiscussionWithUsers')) {
            throw new PermissionDeniedException('Not allowed to add users to a private discussion');
        }
        if ($this->screener->groups->isNotEmpty() && $user->cannot('discussion.startPrivateDiscussionWithGroups')) {
            throw new PermissionDeniedException('Not allowed to add groups to a private discussion');
        }
    }

    protected function checkPermissionsForExistingDiscussion(User $user, Discussion $discussion)
    {
        if ($this->screener->users->isNotEmpty() && $user->cannot('discussion.editUserRecipients', $discussion)) {
            throw new PermissionDeniedException('Not allowed to change users in a private discussion');
        }
        if ($this->screener->groups->isNotEmpty() && $user->cannot('discussion.editGroupRecipients')) {
            throw new PermissionDeniedException('Not allowed to change groups in a private discussion');
        }
    }
}