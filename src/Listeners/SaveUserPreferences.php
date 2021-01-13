<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) 2019 - 2021 FriendsOfFlarum.
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
        $actor = $event->actor;
        $user = $event->user;

        $blocksPd = Arr::pull($event->data, 'attributes.blocksPd');
        $unifiedIndex = Arr::pull($event->data, 'attributes.unifiedIndex');
        if ($blocksPd !== null || $unifiedIndex !== null) {
            $actor->assertPermission($actor->id === $user->id);

            $user->blocks_byobu_pd = (bool) ($blocksPd ?? $user->blocks_byobu_pd);
            $user->unified_index_with_byobu = (bool) ($unifiedIndex ?? $user->unified_index_with_byobu);
        }
    }
}
