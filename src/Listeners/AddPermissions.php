<?php

namespace Flagrow\Byobu\Listeners;

use Flarum\Api\Event\Serializing;
use Flarum\Api\Serializer\DiscussionSerializer;
use Flarum\Api\Serializer\ForumSerializer;
use Illuminate\Contracts\Events\Dispatcher;

class AddPermissions
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(Serializing::class, [$this, 'prepareApiAttributes']);
    }

    /**
     * @param Serializing $event
     */
    public function prepareApiAttributes(Serializing $event)
    {
        if ($event->isSerializer(ForumSerializer::class)) {
            $users = $event->actor->can('discussion.startPrivateDiscussionWithUsers');
            $groups = $event->actor->can('discussion.startPrivateDiscussionWithGroups');

            $event->attributes['canStartPrivateDiscussion'] = $users || $groups;
            $event->attributes['canStartPrivateDiscussionWithUsers'] = $users;
            $event->attributes['canStartPrivateDiscussionWithGroups'] = $groups;
        }
        if ($event->isSerializer(DiscussionSerializer::class)) {
            $users = $event->actor->can('editUserRecipients', $event->model);
            $groups = $event->actor->can('editGroupRecipients', $event->model);

            $event->attributes['canEditRecipients'] = $users || $groups;
            $event->attributes['canEditUserRecipients'] = $users;
            $event->attributes['canEditGroupRecipients'] = $groups;
        }
    }
}
