<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Access;

use Flarum\Post\Post;
use Flarum\User\AbstractPolicy;
use Flarum\User\Guest;
use Flarum\User\User;
use Illuminate\Database\Eloquent\Builder;

/**
 * This policy is needed to prevent posts from showing up for
 * discussions that are marked private and where the user
 * does not have any access to. A great example is a post that
 * is mentioned by someone and the replied to link shows the
 * private content.
 */
class PostPolicy extends AbstractPolicy
{
    protected $model = Post::class;

    public function find(User $actor, Builder $query)
    {
        $query->where(function (Builder $query) use ($actor) {
            // Block every post that is part of a private discussion.
            $query->whereDoesntHave('discussion', function (Builder $query) {
                $query->where('is_private', true);
            });
            // Unless you're not a guest we'll look at recipient users and groups.
            if (!$actor->isGuest()) {
                $query->orWhereHas('discussion', function (Builder $query) use ($actor) {
                    $query->where('is_private', true);
                    $query->where(function (Builder $query) use ($actor) {
                        $query->whereHas('recipientUsers', function (Builder $query) use ($actor) {
                            $query
                                ->where('user_id', $actor->id)
                                ->whereNull('removed_at');
                        });
                        $query->orWhereHas('recipientGroups', function (Builder $query) use ($actor) {
                            $query
                                ->whereIn('group_id', $actor->groups->pluck('id'))
                                ->whereNull('removed_at');
                        });
                    });
                });
            }
        });
    }
}
