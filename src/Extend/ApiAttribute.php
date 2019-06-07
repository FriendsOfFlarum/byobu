<?php

namespace FoF\Byobu\Extend;

use Flarum\Api\Event\Serializing;
use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use Illuminate\Contracts\Container\Container;
use Illuminate\Contracts\Events\Dispatcher;

class ApiAttribute implements ExtenderInterface
{
    protected $mutations = [];

    public function extend(Container $container, Extension $extension = null)
    {
        /** @var Dispatcher $events */
        $events = $container->make(Dispatcher::class);

        $events->listen(Serializing::class, function (Serializing $event) use ($container) {
            foreach ($this->mutations as $mutation) {
                list($serializer, $callable) = $mutation;

                if ($event->isSerializer($serializer)) {
                    $callable = $container->make($callable);
                    $callable($event);
                }
            }
        });
    }

    public function add(string $serializer, $callable)
    {
        $this->mutations[] = [$serializer, $callable];

        return $this;
    }
}
