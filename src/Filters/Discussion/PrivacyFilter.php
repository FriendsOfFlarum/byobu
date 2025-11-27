<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Filters\Discussion;

use Flarum\Search\SearchState;
use FoF\Byobu\Database\RecipientsConstraint;
use Flarum\Search\Filter\FilterInterface;

class PrivacyFilter implements FilterInterface
{
    use RecipientsConstraint;

    public function filter(SearchState $state, array|string $value, bool $negate): void
    {
        $actor = $state->getActor();

        if ($actor->isGuest()) {
            return;
        }

        $state->getQuery()->where(function ($query) use ($actor) {
            $this->constraint($query, $actor);
        });
    }
    public function getFilterKey(): string
    {
        return 'byobu';
    }
}
