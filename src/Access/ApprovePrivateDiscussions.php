<?php

namespace Flagrow\Byobu\Access;

use Flarum\Discussion\Discussion;
use Flarum\User\User;

class ApprovePrivateDiscussions extends AbstractPolicy
{
    /**
     * {@inheritdoc}
     */
    protected $model = Discussion::class;

    /**
     * @param User $actor
     * @param Discussion $discussion
     * @return bool
     */
    public function startWithoutApproval(User $actor, Discussion $discussion)
    {
        return $this->approve($actor, $discussion);
    }

    /**
     * @param User $actor
     * @param Discussion $discussion
     * @return bool
     */
    public function replyWithoutApproval(User $actor, Discussion $discussion)
    {
        return $this->approve($actor, $discussion);
    }

    /**
     * @param User $actor
     * @param Discussion $discussion
     * @return bool
     */
    public function approve(User $actor, Discussion $discussion)
    {
        if (!$discussion->recipientUsers->isEmpty() || !$discussion->recipientGroups->isEmpty()) {
            return true;
        }
    }
}
