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
use Illuminate\Database\Eloquent\Builder as EloquentBuilder;

class DiscussionPolicy extends AbstractPolicy
{
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
        if ($actor->exists) {
            $query->orWhereIn('discussions.id', function ($query) use ($actor) {
                $query->select('discussion_id')
                    ->from('recipients')
                    ->whereNull('removed_at')
                    ->where('user_id', $actor->id)
                    ->orWhereIn('group_id', $actor->groups->pluck('id')->all());
            });

            if (
                $this->extensions->isEnabled('flarum-flags') &&
                $actor->hasPermission('user.viewPrivateDiscussionsWhenFlagged') &&
                $actor->hasPermission('discussion.viewFlags')
            ) {
                $query->orWhereIn('discussions.id', function ($query) {
                    $query->select('posts.discussion_id')
                        ->from('flags')
                        ->leftJoin('posts', 'flags.post_id', 'posts.id');
                });
            }
        }
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
        if (!$discussion->recipientUsers->isEmpty() || !$discussion->recipientGroups->isEmpty()) {
            return true;
        }
    }
}
