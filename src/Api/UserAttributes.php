<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

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
