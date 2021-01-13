<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) 2019 - 2021 FriendsOfFlarum.
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
    use RecipientsConstraint;

    public function handle(Searching $event)
    {
        $actor = $event->search->getActor();

        if ($actor->isGuest() === false
            && empty($event->criteria->query)
            && $actor->unified_index_with_byobu) {
            $this->unify($event->search->getQuery(), $actor);
        } elseif ($actor->isGuest() || !count($event->search->getActiveGambits())) {
            $event->search->getQuery()->where('is_private', false);
        }
    }

    public function unify(Builder $query, User $actor)
    {
        $this->constraint($query, $actor, true);
    }
}
