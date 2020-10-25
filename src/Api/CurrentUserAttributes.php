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
use Flarum\Discussion\Discussion;
use Flarum\User\User;
use FoF\Byobu\Database\RecipientsConstraint;
use Illuminate\Database\Query\JoinClause;

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

        $query = Discussion::query()
            ->distinct()
            ->leftJoin('discussion_user', function (JoinClause $join) use ($user) {
                $join
                    ->on('discussions.id', '=', 'discussion_user.discussion_id')
                    ->where('discussion_user.user_id', $user->id);
            })
            ->where('is_private', true)
            ->where(function ($query) {
                $query
                    ->where('discussion_user.last_read_post_number', '<', 'discussions.last_post_number')
                    ->orWhereNull('discussion_user.last_read_post_number');
            })
            ->whereVisibleTo($user);
//
//        $query = $user->read()
//            ->wherePivot('last_read_post_number', '<', 'discussions.last_post_number')
//            ->where('is_private', true);
//
//        $this->constraint($query, $user, false);

        $event->attributes['unreadPrivateMessagesCount'] = $query->count();
    }
}
