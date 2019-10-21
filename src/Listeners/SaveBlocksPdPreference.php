<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

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
