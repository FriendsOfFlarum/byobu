<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Database;

use Flarum\User\User;
use Illuminate\Database\Query\Builder;

class RecipientsConstraint
{
    public function __invoke(Builder $query, User $user, bool $unify = false)
    {
        $method = $unify ? 'orWhere' : 'where';

        $query
            // Removes duplicates from results.
            ->distinct()
            // Join the recipient table with the query for performance.
            ->join('recipients', 'discussions.id', '=', 'recipients.discussion_id')
            // Do a subquery where for filtering.
            ->{$method}(function (Builder $query) use ($user) {
                $groupIds = $user->groups->pluck('id')->all();

                $query
                    ->whereIn('recipients.user_id', [$user->id])
                    ->when(count($groupIds) > 0, function (Builder $query) use ($groupIds) {
                        $query->orWhereIn('recipients.group_id', $groupIds);
                    });
            });
    }
}
