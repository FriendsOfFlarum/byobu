<?php

namespace Flagrow\Byobu\Access;

use Flagrow\Byobu\Traits\ProvidesAccess;
use Flarum\Core\Access\AbstractPolicy;
use Flarum\Core\Discussion;
use Flarum\Core\User;
use Flarum\Extension\ExtensionManager;
use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Database\Query\Builder;
use Illuminate\Database\Query\Expression;

class DiscussionPolicy extends AbstractPolicy
{

    use ProvidesAccess;
    /**
     * @var ExtensionManager
     */
    protected $extensions;

    /**
     * DiscussionPolicy constructor.
     * @param ExtensionManager $extensions
     */
    public function __construct(ExtensionManager $extensions)
    {
        $this->extensions = $extensions;
    }

    /**
     * {@inheritdoc}
     */
    protected $model = Discussion::class;


    /**
     * @param User $actor
     * @param string $ability
     * @param Discussion $discussion
     * @return bool
     */
    public function before(User $actor, $ability, Discussion $discussion)
    {
        return $this->granted($discussion, $actor);
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
     * @param EloquentBuilder|Builder $query
     * @param User $actor
     */
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
                            $query->where('recipients.user_id', $actor->id);
                            if (!$actor->groups->isEmpty()) {
                                $query->orWhereIn('recipients.group_id', $actor->groups->pluck('id')->all());
                            }
                        });
                });

                $this->showWithFlags($query, $actor, 'posts.flags');
            }
        });
    }
}
