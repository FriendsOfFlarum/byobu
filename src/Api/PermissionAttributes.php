<?php

namespace FoF\Byobu\Api;

use Flarum\Api\Event\Serializing;
use Flarum\Api\Serializer\DiscussionSerializer;
use Flarum\Api\Serializer\ForumSerializer;

class PermissionAttributes
{
    /**
     * @param Serializing $event
     */
    public function __invoke(Serializing $event)
    {
        if ($event->isSerializer(ForumSerializer::class)) {
            $users = $event->actor->can('discussion.startPrivateDiscussionWithUsers');
            $groups = $event->actor->can('discussion.startPrivateDiscussionWithGroups');

            $event->attributes['canStartPrivateDiscussion'] = $users || $groups;
            $event->attributes['canStartPrivateDiscussionWithUsers'] = $users;
            $event->attributes['canStartPrivateDiscussionWithGroups'] = $groups;
            $event->attributes['canStartPrivateDiscussionWithBlockers'] = $event->actor->can('discussion.startPrivateDiscussionWithBlockers');
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
