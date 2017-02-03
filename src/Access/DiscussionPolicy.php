<?php

namespace Flagrow\Byobu\Access;

use Flarum\Core\Access\AbstractPolicy;
use Flarum\Core\Discussion;
use Flarum\Core\User;
use Flarum\Event\ScopeHiddenDiscussionVisibility;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Query\Builder;
use Illuminate\Database\Query\Expression;

class DiscussionPolicy extends AbstractPolicy
{

    /**
     * {@inheritdoc}
     */
    protected $model = Discussion::class;


    /**
     * {@inheritdoc}
     */
    public function subscribe(Dispatcher $events)
    {
        parent::subscribe($events);

        $events->listen(ScopeHiddenDiscussionVisibility::class, [$this, 'scopeHiddenDiscussionVisibility']);
    }

    /**
     * @param User $actor
     * @param string $ability
     * @param Discussion $discussion
     * @return bool
     */
    public function before(User $actor, $ability, Discussion $discussion)
    {
        /** @var Collection $users */
        $users = $discussion->recipientUsers->pluck('id');

        if ($users->contains($actor->id)) {
            return true;
        }

        /** @var Collection $groups */
        $groups = $discussion->recipientGroups->pluck('id');

        $groups->each(function ($requiredGroupId) use ($actor) {
            if ($actor->groups()->find($requiredGroupId)) {
                return true;
            }
        });

        return false;
    }

    /**
     * @param User $actor
     * @param EloquentBuilder $query
     */
    public function find(User $actor, EloquentBuilder $query)
    {
        $this->queryConstraints($query, $actor);
    }

    /**
     * @param ScopeHiddenDiscussionVisibility $event
     */
    public function scopeHiddenDiscussionVisibility(ScopeHiddenDiscussionVisibility $event)
    {
        $this->queryConstraints($event->query, $event->actor);
    }

    protected function queryConstraints(EloquentBuilder &$query, User $actor)
    {
        $query->where(function (EloquentBuilder $query) use ($actor) {
            $query->whereNotExists(function (Builder $query) {
                $query->select(app('flarum.db')->raw(1))
                    ->from('recipients')
                    ->where('discussions.id', new Expression('discussion_id'))
                    ->whereNull('removed_at');
            });
            if ($actor->exists) {
                $query->orWhereExists(function (Builder $query) use ($actor) {
                    $query->select(app('flarum.db')->raw(1))
                        ->from('recipients')
                        ->where('discussions.id', new Expression('discussion_id'))
                        ->whereNull('removed_at')
                        ->where(function (Builder $query) use ($actor) {
                            $query
                                ->where('user_id', $actor->id)
                                ->orWhereIn('group_id', $actor->groups->pluck('id')->all());
                        });
                });
            }
        });
        return $query;
    }
}
