<?php

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
        $constraint = new RecipientsConstraint;

        $constraint($query, $actor, $actor->unified_index_with_byobu);
    }
}
