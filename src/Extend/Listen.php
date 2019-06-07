<?php

namespace FoF\Byobu\Extend;

use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use Illuminate\Contracts\Container\Container;
use Illuminate\Contracts\Events\Dispatcher;

class Listen implements ExtenderInterface
{
    protected $listeners = [];

    public function extend(Container $container, Extension $extension = null)
    {
        /** @var Dispatcher $events */
        $events = $container->make(Dispatcher::class);

        foreach ($this->listeners as $listener) {
            $events->listen($listener[0], $listener[1]);
        }
    }

    public function on(string $event, $callable)
    {
        $this->listeners[] = [$event, $callable];

        return $this;
    }
}

