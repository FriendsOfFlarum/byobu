<?php

namespace Flagrow\Messaging\Listeners;

use Flarum\Api\Serializer\DiscussionSerializer;
use Flarum\Api\Serializer\UserSerializer;
use Flarum\Core\Discussion;
use Flarum\Core\User;
use Flarum\Event\GetApiRelationship;
use Flarum\Event\GetModelRelationship;
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
    }

    /**
     * @param GetModelRelationship $event
     * @return \Illuminate\Database\Eloquent\Relations\HasManyThrough
     */
    public function getModelRelationship(GetModelRelationship $event)
    {
        if ($event->isRelationship(Discussion::class, 'recipients')) {
            return $event->model->belongsToMany(
                User::class,
                'recipients'
            );
        }
        if ($event->isRelationship(User::class, 'recipients')) {
            return $event->model->belongsToMany(
                Discussion::class,
                'recipients'
            );
        }
    }

    /**
     * @param GetApiRelationship $event
     * @return \Tobscure\JsonApi\Relationship
     */
    public function getApiRelationship(GetApiRelationship $event)
    {
        if ($event->isRelationship(DiscussionSerializer::class, 'recipients')) {
            return $event->serializer->hasMany($event->model, UserSerializer::class, 'recipients');
        }
        if ($event->isRelationship(UserSerializer::class, 'recipients')) {
            return $event->serializer->hasMany($event->model, DiscussionSerializer::class, 'recipients');
        }
    }
}
