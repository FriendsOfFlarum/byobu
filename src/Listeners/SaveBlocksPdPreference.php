<?php

namespace FoF\Byobu\Listeners;

use Flarum\User\Event\Saving;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Support\Arr;

class SaveBlocksPdPreference
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(Saving::class, [$this, 'saveBlocksPd']);
    }

    public function saveBlocksPd(Saving $event)
    {
        $blocksPd = Arr::get($event->data, 'attributes.preferences.blocksPd', false);
        $event->user->blocks_byobu_pd = $blocksPd;
    }
}
