<?php

namespace FoF\Byobu\Gambits\User;

use Flarum\Search\AbstractRegexGambit;
use Flarum\Search\AbstractSearch;

class AllowsPdGambit extends AbstractRegexGambit
{
    protected $pattern = 'allows-pd';

    /**
     * Apply conditions to the search, given that the gambit was matched.
     *
     * @param AbstractSearch $search  The search object.
     * @param array          $matches An array of matches from the search bit.
     * @param bool           $negate  Whether or not the bit was negated, and thus whether
     *                                or not the conditions should be negated.
     * @return mixed
     */
    protected function conditions(AbstractSearch $search, array $matches, $negate)
    {
        $actor = $search->getActor();

        if ($actor->cannot('startPrivateDiscussionWithBlockers')) {
            $search
                ->getQuery()
                ->where(function($query) use ($negate) {
                    $query->where('blocks_byobu_pd', $negate);
                });
        }
    }
}
