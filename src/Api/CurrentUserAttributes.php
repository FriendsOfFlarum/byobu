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
use FoF\Byobu\Database\RecipientsConstraint;

class CurrentUserAttributes
{
    use RecipientsConstraint;

    /**
     * @param Serializing $event
     */
    public function __invoke(Serializing $event)
    {
        /** @var User $user */
        $user = $event->model;

        $query = $user->read()
            ->where('is_private', true)
            ->where('last_read_post_number', '<', 'last_post_number')
            ->getQuery();

        $this->constraint($query, $user, false);

        $event->attributes['unreadPrivateMessages'] = (bool) $query->count();
    }
}
