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
use Illuminate\Support\Arr;

class SaveUserPreferences
{
    public function handle(Saving $event)
    {
        $event->user->blocks_byobu_pd = (bool) Arr::pull(
            $event->data,
            'attributes.blocksPd',
            $event->user->blocks_byobu_pd
        );

        $event->user->unified_index_with_byobu = (bool) Arr::pull(
            $event->data,
            'attributes.unifiedIndex',
            $event->user->unified_index_with_byobu
        );
    }
}
