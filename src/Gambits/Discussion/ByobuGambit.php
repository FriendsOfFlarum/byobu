<?php

namespace FoF\Byobu\Gambits\Discussion;

use Flarum\Discussion\Search\DiscussionSearch;
use Flarum\Search\AbstractRegexGambit;
use Flarum\Search\AbstractSearch;
use Flarum\User\UserRepository;
use LogicException;

class ByobuGambit extends AbstractRegexGambit
{
    /**
     * {@inheritdoc}
     */
    protected $pattern = 'byobu:(.+)';

    /**
     * @var UserRepository
     */
    protected $users;

    /**
     * @param UserRepository $users
     */
    public function __construct(UserRepository $users)
    {
        $this->users = $users;
    }

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
        if (! $search instanceof DiscussionSearch) {
            throw new LogicException('This gambit can only be applied on a DiscussionSearch');
        }

        $usernames = explode(',', trim($matches[1], '"'));

        $ids = [];

        foreach ($usernames as $username) {
            $ids[] = $this->users->getIdForUsername($username);
        }

        $actor = $search->getActor();

        $ids[] = $actor->id;

        $search->getQuery()
            ->orWhereHas('recipients', function ($query) use ($ids) {
                $query->whereIn('user_id', $ids);
            });
    }
}
