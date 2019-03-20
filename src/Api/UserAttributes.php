<?php

namespace Flagrow\Byobu\Api;

use Flarum\Api\Event\Serializing;
use Flarum\Api\Serializer\BasicUserSerializer;
use Flarum\Api\Serializer\DiscussionSerializer;
use Flarum\User\User;

class UserAttributes
{
    /**
     * @param Serializing $event
     */
    public function __invoke(Serializing $event)
    {
        if ($event->isSerializer(BasicUserSerializer::class)) {
            /** @var User $user */
            $user = $event->model;
            $event->attributes['blocksPd'] = $user->getPreference('blocksPd', false);
        }
    }
}
