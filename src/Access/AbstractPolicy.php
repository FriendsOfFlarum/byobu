<?php

namespace Flagrow\Byobu\Access;

use Flarum\Core\Access\AbstractPolicy as Policy;
use Flarum\Event\ScopeModelVisibility;
use Illuminate\Contracts\Events\Dispatcher;

abstract class AbstractPolicy extends Policy
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        parent::subscribe($events);

        $events->listen(ScopeModelVisibility::class, [$this, 'scopeModelVisibilityAfter'], -100);
    }


    /**
     * @param ScopeModelVisibility $event
     */
    public function scopeModelVisibilityAfter(ScopeModelVisibility $event)
    {
        if ($event->model instanceof $this->model && method_exists($this, 'findAfter')) {
            call_user_func_array([$this, 'findAfter'], [$event->actor, $event->query]);
        }
    }
}
