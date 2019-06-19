<?php

namespace FoF\Byobu\Gambits\Discussion;

use Flarum\Discussion\Search\DiscussionSearch;
use Flarum\Search\AbstractRegexGambit;
use Flarum\Search\AbstractSearch;
use Flarum\User\User;
use Flarum\User\UserRepository;
use Illuminate\Database\Query\Builder;
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

        $actor = $search->getActor();

        $userIds = User::query()
            ->whereIn('username', $usernames)
            ->whereVisibleTo($actor)
            ->pluck('id')
            ->toArray();

        $userIds[] = $actor->id;
        $groupIds = $actor->groups()->pluck('id')->toArray();

        $search->getQuery()
            ->join('recipients', 'discussions.id', '=', 'recipients.discussion_id')
            ->where(function (Builder $query) use ($userIds, $groupIds) {
                $query
                    ->whereIn('recipients.user_id', $userIds)
                    ->orWhereIn('recipients.group_id', $groupIds);
            });
    }
}
