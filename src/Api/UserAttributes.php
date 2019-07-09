<?php

namespace FoF\Byobu\Api;

use Flarum\Api\Event\Serializing;
use Flarum\User\User;

class UserAttributes
{
    /**
     * @param Serializing $event
     */
    public function __invoke(Serializing $event)
    {
        /** @var User $user */
        $user = $event->model;
        
        $event->attributes['blocksPd'] = (bool) $user->blocks_byobu_pd;
        $event->attributes['cannotBeDirectMessaged'] = $event->actor->can('cannotBeDirectMessaged', $user);
    }
}
