<?php

namespace Flagrow\Messaging\Gambits\Discussion;

use Flarum\Core\Search\AbstractRegexGambit;
use Flarum\Core\Search\AbstractSearch;
use Illuminate\Database\Query\Builder;

class PrivacyGambit extends AbstractRegexGambit
{
    /**
     * {@inheritdoc}
     */
    protected $pattern = 'is:private';

    /**
     * Apply conditions to the search, given that the gambit was matched.
     *
     * @param AbstractSearch $search The search object.
     * @param array $matches An array of matches from the search bit.
     * @param bool $negate Whether or not the bit was negated, and thus whether
     *     or not the conditions should be negated.
     * @return mixed
     */
    protected function conditions(AbstractSearch $search, array $matches, $negate)
    {
        $actor = $search->getActor();

        if (!$actor->exists || $negate) {
            $search->getQuery()->where(function (Builder $query) {
                $query->doesntHave('recipients');
            });
        } else {
            $search->getQuery()->where(function (Builder $query) use ($actor) {
                $query->join('recipients', function($join) use ($actor) {
                    $join->on('discussions.id', '=', 'recipients.discussion_id')
                        ->where('recipients.user_id', $actor->id);
                });
            });
        }
    }
}
