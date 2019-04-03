<?php

namespace Flagrow\Byobu\Gambits\User;

use Flarum\Search\AbstractSearch;
use Flarum\Search\GambitInterface;

class BlocksPdGambit implements GambitInterface
{
    /**
     * Apply conditions to the searcher for a bit of the search string.
     *
     * @param AbstractSearch $search
     * @param string         $bit The piece of the search string.
     * @return bool Whether or not the gambit was active for this bit.
     */
    public function apply(AbstractSearch $search, $bit)
    {
        $actor = $search->getActor();

        if (!$actor->can('startPrivateDiscussionWithBlockers')) {
            $search
                ->getQuery()
                ->where(function($query) {
                    $query
                        ->where('preferences->blocksPd', false)
                        ->orWhereNull('preferences->blocksPd');
                });
        }

        return true;
    }
}
