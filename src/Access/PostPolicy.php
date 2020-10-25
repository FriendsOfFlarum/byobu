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
use Flarum\User\User;
use FoF\Byobu\Database\RecipientsConstraint;
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
    use RecipientsConstraint;

    protected $model = Post::class;

    public function find(User $actor, Builder $query)
    {
        $query->whereHas('discussion', function ($query) use ($actor) {
            $this->constraint(
                $query,
                $actor,
                true
            );
        });
    }
}
