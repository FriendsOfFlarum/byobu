<?php

namespace FoF\Byobu\Access;

use Flarum\Discussion\Discussion;
use Flarum\User\AbstractPolicy;
use Flarum\User\User;
use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Database\Query\Builder;

class DiscussionPolicy extends AbstractPolicy
{
    /**
     * {@inheritdoc}
     */
    protected $model = Discussion::class;

    /**
     * @param User            $actor
     * @param EloquentBuilder $query
     */
    public function findPrivate(User $actor, EloquentBuilder $query)
    {
        if ($actor->exists) {

            $query->orWhereExists(function (Builder $query) use ($actor) {
                $prefix = $query->getConnection()->getTablePrefix();

                return $query->selectRaw('1')
                    ->from('recipients')
                    ->whereRaw($prefix.'discussions.id = discussion_id')
                    ->whereNull('removed_at')
                    ->where(function (Builder $query) use ($actor) {
                        $query->where('recipients.user_id', $actor->id);

                        if (!$actor->groups->isEmpty()) {
                            $query->orWhereIn('recipients.group_id', $actor->groups->pluck('id')->all());
                        }
                    });
            });
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
