<?php

namespace FoF\Byobu\Listeners;

use Carbon\Carbon;
use Flarum\Discussion\Discussion;
use Flarum\Discussion\Event\Saving;
use Flarum\User\Exception\PermissionDeniedException;
use Flarum\User\User;
use FoF\Byobu\Discussion\Screener;
use FoF\Byobu\Events;
use Illuminate\Support\Str;

class PersistRecipients
{
    /**
     * @var Screener
     */
    protected $screener;

    public function handle(Saving $event)
    {
        $this->screener = Screener::whenSavingDiscussions($event);

        if ($this->screener->nothingChanged) {
            return;
        }

        if ($event->actor->cannot('startPrivateDiscussionWithBlockers') && $this->screener->hasBlockingUsers()) {
            throw new PermissionDeniedException('Not allowed to add users that blocked receiving private discussions');
        }

        if (! $event->discussion->exists) {
            $this->checkPermissionsForNewDiscussion($event->actor);
        } else {
            $this->checkPermissionsForExistingDiscussion($event->actor, $event->discussion);
        }

        // If discussions are or were private, we'll set the is_private flag.
        // This is a Flarum native flag that prevents access to it unless given
        // by a Gate.
        if ($this->screener->isPrivate || $this->screener->wasPrivate) {
            $event->discussion->is_private = true;
        }

        // Private discussions that used to be private but no longer have any recipients
        // now by default will be soft deleted/hidden.
        if ($this->screener->wasPrivate && ! $this->screener->isPrivate) {
            $event->discussion->hide($event->actor);
        }

        $this->raiseEvent($event->discussion);

        $event->discussion->afterSave(function (Discussion $discussion) {
            foreach (['users', 'groups'] as $type) {
                $relation = "recipient" . Str::ucfirst($type);

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

    protected function raiseEvent(Discussion $discussion)
    {
        $args = [
            $discussion,
            $this->screener->actor,
            $this->screener->users->pluck('id'),
            $this->screener->groups->pluck('id'),
            $this->screener->currentUsers->pluck('id'),
            $this->screener->currentGroups->pluck('id'),
        ];

        if ($this->screener->isPrivate && ! $discussion->exists) {
            $event = new Events\PrivateDiscussionCreated(...$args);
        } elseif ($this->screener->actorRemoved()) {
            $event = new Events\DiscussionRecipientRemovedSelf(...$args);
        } else {
            $event = new Events\DiscussionRecipientsChanged(...$args);
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
