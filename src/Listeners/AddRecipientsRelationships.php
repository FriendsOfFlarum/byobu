<?php

namespace FoF\Byobu\Listeners;

use Flarum\Api\Event\WillGetData;
use Flarum\Api\Serializer;
use Flarum\Discussion\Discussion;
use Flarum\Event\GetApiRelationship;
use Flarum\Event\GetModelRelationship;
use Flarum\Group\Group;
use Flarum\User\User;
use Illuminate\Contracts\Events\Dispatcher;

class AddRecipientsRelationships
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(GetModelRelationship::class, [$this, 'getModelRelationship']);
        $events->listen(GetApiRelationship::class, [$this, 'getApiRelationship']);
        $events->listen(WillGetData::class, [$this, 'includeRecipientsRelationship']);
    }

    /**
     * @param GetModelRelationship $event
     *
     * @return \Illuminate\Database\Eloquent\Relations\belongsToMany
     */
    public function getModelRelationship(GetModelRelationship $event)
    {
        if ($event->isRelationship(Discussion::class, 'recipientUsers')) {
            return $event->model->belongsToMany(
                User::class,
                'recipients'
            )
                ->withTimestamps()
                ->wherePivot('removed_at', null);
        }
        if ($event->isRelationship(Discussion::class, 'oldRecipientUsers')) {
            return $event->model->belongsToMany(
                User::class,
                'recipients'
            )
                ->withTimestamps()
                ->wherePivot('removed_at', '!=', 'null');
        }

        if ($event->isRelationship(Discussion::class, 'recipientGroups')) {
            return $event->model->belongsToMany(
                Group::class,
                'recipients'
            )
                ->withTimestamps()
                ->wherePivot('removed_at', null);
        }
        if ($event->isRelationship(Discussion::class, 'oldRecipientGroups')) {
            return $event->model->belongsToMany(
                Group::class,
                'recipients'
            )
                ->withTimestamps()
                ->wherePivot('removed_at', '!=', 'null');
        }
        if ($event->isRelationship(User::class, 'privateDiscussions')) {
            return $event->model->belongsToMany(
                Discussion::class,
                'recipients'
            )
                ->withTimestamps()
                ->wherePivot('removed_at', null);
        }
        if ($event->isRelationship(Group::class, 'privateDiscussions')) {
            return $event->model->belongsToMany(
                Discussion::class,
                'recipients'
            )
                ->withTimestamps()
                ->wherePivot('removed_at', null);
        }
    }

    /**
     * @param WillGetData $event
     */
    public function includeRecipientsRelationship(WillGetData $event)
    {
        if ($event->controller->serializer === Serializer\DiscussionSerializer::class) {
            $event->addInclude(['recipientUsers', 'oldRecipientUsers', 'recipientGroups', 'oldRecipientGroups']);
        }
    }

    /**
     * @param GetApiRelationship $event
     *
     * @return \Tobscure\JsonApi\Relationship
     */
    public function getApiRelationship(GetApiRelationship $event)
    {
        if ($event->isRelationship(Serializer\BasicDiscussionSerializer::class, 'recipientUsers')) {
            return $event->serializer->hasMany($event->model, Serializer\UserSerializer::class, 'recipientUsers');
        }
        if ($event->isRelationship(Serializer\BasicDiscussionSerializer::class, 'oldRecipientUsers')) {
            return $event->serializer->hasMany($event->model, Serializer\UserSerializer::class, 'oldRecipientUsers');
        }

        if ($event->isRelationship(Serializer\BasicDiscussionSerializer::class, 'recipientGroups')) {
            return $event->serializer->hasMany($event->model, Serializer\GroupSerializer::class, 'recipientGroups');
        }
        if ($event->isRelationship(Serializer\BasicDiscussionSerializer::class, 'oldRecipientGroups')) {
            return $event->serializer->hasMany($event->model, Serializer\GroupSerializer::class, 'oldRecipientGroups');
        }

        if ($event->isRelationship(Serializer\UserSerializer::class, 'privateDiscussions')) {
            return $event->serializer->hasMany($event->model, Serializer\DiscussionSerializer::class, 'privateDiscussions');
        }
    }
}
