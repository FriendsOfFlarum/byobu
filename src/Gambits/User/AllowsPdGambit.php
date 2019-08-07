<?php

namespace FoF\Byobu\Gambits\User;

use Flarum\Search\AbstractRegexGambit;
use Flarum\Search\AbstractSearch;
use FoF\Byobu\Events\SearchingForRecipients;
use Illuminate\Contracts\Events\Dispatcher;

class AllowsPdGambit extends AbstractRegexGambit
{
    protected $pattern = 'allows-pd';

    /**
     * @var Dispatcher
     */
    public $dispatcher;

    public function __construct(Dispatcher $dispatcher)
    {
        $this->dispatcher = $dispatcher;
    }

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

        $this->dispatcher->dispatch(new SearchingForRecipients($search, $matches, $negate));

        if ($actor->cannot('startPrivateDiscussionWithBlockers')) {
            $search
                ->getQuery()
                ->where(function($query) use ($negate) {
                    $query->where('blocks_byobu_pd', $negate);
                })
                ->orderBy('username', 'asc');
        }
    }
}
