<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) 2019 - 2021 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Gambits\Discussion;

use Flarum\Search\AbstractRegexGambit;
use Flarum\Search\AbstractSearch;
use FoF\Byobu\Database\RecipientsConstraint;

class PrivacyGambit extends AbstractRegexGambit
{
    use RecipientsConstraint;
    /**
     * {@inheritdoc}
     */
    protected $pattern = 'is:private';

    /**
     * Apply conditions to the search, given that the gambit was matched.
     *
     * @param AbstractSearch $search  The search object.
     * @param array          $matches An array of matches from the search bit.
     * @param bool           $negate  Whether or not the bit was negated, and thus whether
     *                                or not the conditions should be negated.
     *
     * @return mixed
     */
    protected function conditions(AbstractSearch $search, array $matches, $negate)
    {
        $actor = $search->getActor();

        $search->getQuery()->where(function ($query) use ($actor) {
            $this->constraint($query, $actor, false);
        });
    }
}
