<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Access;

use Flarum\Discussion\Discussion;
use Flarum\Extension\ExtensionManager;
use Flarum\User\AbstractPolicy;
use Flarum\User\User;
use FoF\Byobu\Database\RecipientsConstraint;
use FoF\Byobu\Discussion\Screener;
use Illuminate\Database\Eloquent\Builder as EloquentBuilder;

class DiscussionPolicy extends AbstractPolicy
{
    use RecipientsConstraint;

    /**
     * {@inheritdoc}
     */
    protected $model = Discussion::class;

    /**
     * @var ExtensionManager
     */
    protected $extensions;

    public function __construct(ExtensionManager $extensions)
    {
        $this->extensions = $extensions;
    }

    /**
     * @param User            $actor
     * @param EloquentBuilder $query
     */
    public function findPrivate(User $actor, EloquentBuilder $query)
    {
        $this->constraint($query, $actor, true);
    }

    /**
     * @param User       $actor
     * @param Discussion $discussion
     *
     * @return bool|void
     */
    public function startWithoutApproval(User $actor, Discussion $discussion)
    {
        return $this->approveIfPrivate($discussion);
    }

    /**
     * @param User       $actor
     * @param Discussion $discussion
     *
     * @return bool|void
     */
    public function replyWithoutApproval(User $actor, Discussion $discussion)
    {
        return $this->approveIfPrivate($discussion);
    }

    /**
     * @param Discussion $discussion
     *
     * @return bool|void
     */
    private function approveIfPrivate(Discussion $discussion)
    {
        /** @var Screener $screener */
        $screener = app('byobu.screener');
        $screener = $screener->fromDiscussion($discussion);

        return $screener->isPrivate();
    }
}
