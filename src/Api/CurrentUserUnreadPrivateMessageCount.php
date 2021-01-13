<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) 2019 - 2021 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Api;

use Flarum\Api\Serializer\CurrentUserSerializer;
use Flarum\Discussion\Discussion;
use Flarum\User\User;
use FoF\Byobu\Database\RecipientsConstraint;
use Illuminate\Database\Query\JoinClause;

class CurrentUserUnreadPrivateMessageCount
{
    use RecipientsConstraint;

    /**
     * @param Flarum\Api\Serializer\CurrentUserSerializer $serializer
     * @param Flarum\User\User                            $user
     *
     * @return mixed
     */
    public function __invoke(CurrentUserSerializer $serializer, User $user)
    {
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

        return $query->count();
    }
}
