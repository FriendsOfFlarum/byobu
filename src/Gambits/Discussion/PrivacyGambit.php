<?php

namespace Flagrow\Messaging\Gambits\Discussion;

use Flarum\Core\Search\AbstractRegexGambit;
use Flarum\Core\Search\AbstractSearch;
use Illuminate\Database\Query\Builder;
use Illuminate\Database\Query\Expression;
use Illuminate\Database\Query\JoinClause;

class PrivacyGambit extends AbstractRegexGambit
{
    /**
     * {@inheritdoc}
     */
    protected $pattern = 'is:private';

    /**
     * {@inheritdoc}
     */
    public function apply(AbstractSearch $search, $bit)
    {
        if ($matches = $this->match($bit)) {
            list($negate) = array_splice($matches, 1, 1);
        } else {
            $matches = [];
            $negate = false;
        }

        $this->conditions($search, $matches, (bool)$negate);

        return true;
    }

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

        // Show only public messages.
        $public = empty($matches) || $negate;

        $method = $actor->exists && !$public ? 'whereExists' : 'whereNotExists';

        $search->getQuery()->$method(function (Builder $query) use ($public, $actor) {
            $query->select(app('flarum.db')->raw(1))
                ->from('recipients')
                ->where('discussions.id', new Expression('discussion_id'));
            if (!$public) {
                $query->where('user_id', $actor->id);
            }
        });
    }
}
