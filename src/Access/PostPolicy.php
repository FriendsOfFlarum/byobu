<?php

namespace Flagrow\Byobu\Access;

use Flagrow\Byobu\Traits\ProvidesAccess;
use Flarum\Core\Discussion;
use Flarum\Core\Post;
use Flarum\Core\User;
use Flarum\Event\ScopePostVisibility;
use Flarum\Extension\ExtensionManager;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Database\Query\Builder;

class PostPolicy extends AbstractPolicy
{

    use ProvidesAccess;

    /**
     * @var ExtensionManager
     */
    protected $extensions;

    /**
     * {@inheritdoc}
     */
    protected $model = Post::class;

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
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ScopePostVisibility::class, [$this, 'scopeHiddenDiscussionVisibility']);
    }

    /**
     * @param ScopePostVisibility $event
     */
    public function scopeHiddenDiscussionVisibility(ScopePostVisibility $event)
    {
        $this->queryConstraints($event->discussion, $event->actor, $event->query);
    }

    /**
     * @param Discussion $discussion
     * @param User $actor
     * @param EloquentBuilder|Builder $query
     */
    protected function queryConstraints(Discussion $discussion, User $actor, EloquentBuilder &$query)
    {
        // Close down to only specific users.
        if ($discussion->recipientUsers || $discussion->recipientGroups) {
            if (!$actor->exists || !$this->granted($discussion, $actor)) {
                $query->whereNull('posts.id');
            }

            $this->showWithFlags($query, $actor, 'flags');
        }
    }
}
