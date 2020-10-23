<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Listeners;

use Flarum\Discussion\Event\Searching;
use Flarum\User\User;
use FoF\Byobu\Database\RecipientsConstraint;
use Illuminate\Database\Query\Builder;

class UnifiedIndex
{
    public function handle(Searching $event)
    {
        $actor = $event->search->getActor();

        if ($actor instanceof User && $actor->unified_index_with_byobu) {
            $this->unify($event->search->getQuery(), $actor);
        }
    }

    public function unify(Builder $query, User $actor)
    {
        $constraint = new RecipientsConstraint();

        $constraint($query, $actor, $actor->unified_index_with_byobu);
    }
}
