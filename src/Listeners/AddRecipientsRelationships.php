<?php

namespace Flagrow\Byobu\Listeners;

use Flarum\Api\Controller;
use Flarum\Api\Serializer\DiscussionSerializer;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Api\Serializer\UserSerializer;
use Flarum\Core\Discussion;
use Flarum\Core\User;
use Flarum\Event\ConfigureApiController;
use Flarum\Event\GetApiRelationship;
use Flarum\Event\GetModelRelationship;
use Flarum\Event\PrepareApiAttributes;
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
        $events->listen(PrepareApiAttributes::class, [$this, 'prepareApiAttributes']);
        $events->listen(ConfigureApiController::class, [$this, 'includeRecipientsRelationship']);
    }

    /**
     * @param GetModelRelationship $event
     * @return \Illuminate\Database\Eloquent\Relations\belongsToMany
     */
    public function getModelRelationship(GetModelRelationship $event)
    {
        if ($event->isRelationship(Discussion::class, 'recipients')) {
            return $event->model->belongsToMany(
                User::class,
                'recipients'
            )
                ->withTimestamps()
                ->withPivot('deleted_at');
        }
        if ($event->isRelationship(User::class, 'recipients')) {
            return $event->model->belongsToMany(
                Discussion::class,
                'recipients'
            )
                ->withTimestamps()
                ->withPivot('deleted_at');
        }
    }

    /**
     * @param ConfigureApiController $event
     */
    public function includeRecipientsRelationship(ConfigureApiController $event)
    {
        if ($event->isController(Controller\ListDiscussionsController::class)
            || $event->isController(Controller\ShowDiscussionController::class)
            || $event->isController(Controller\CreateDiscussionController::class)
        ) {
            $event->addInclude('recipients');
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

    /**
     * @param PrepareApiAttributes $event
     */
    public function prepareApiAttributes(PrepareApiAttributes $event)
    {
        if ($event->isSerializer(ForumSerializer::class)) {
            $event->attributes['canStartPrivateDiscussion'] = $event->actor->can('startPrivateDiscussion');
        }
        if ($event->isSerializer(DiscussionSerializer::class)) {
            $event->attributes['canEditRecipients'] = $event->actor->can('editRecipients', $event->model);
        }
    }
}
