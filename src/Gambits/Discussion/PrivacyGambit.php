<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Gambits\Discussion;

use Flarum\Search\AbstractRegexGambit;
use Flarum\Search\SearchState;
use FoF\Byobu\Database\RecipientsConstraint;

class PrivacyGambit extends AbstractRegexGambit
{
    use RecipientsConstraint;

    public function getGambitPattern()
    {
        return 'is:private';
    }

    protected function conditions(SearchState $search, array $matches, $negate)
    {
        $actor = $search->getActor();

        if ($actor->isGuest()) {
            return;
        }

        $search->getQuery()->where(function ($query) use ($actor) {
            $this->constraint($query, $actor);
        });
    }
}
