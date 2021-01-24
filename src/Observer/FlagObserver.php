<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) 2019 - 2021 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Observer;

use Flarum\Discussion\Discussion;
use Flarum\Flags\Flag;

/**
 * Temporary implementation pending https://github.com/flarum/flags/pull/35
 * Replace with a listener when the event is available.
 */
class FlagObserver
{
    /**
     * Handle the Flag "created" event.
     *
     * @param \Flarum\Flags\Flag $flag
     *
     * @return void
     */
    public function created(Flag $flag)
    {
        $discussion = Discussion::find($flag->post->discussion_id);

        if ($discussion && $discussion->is_private) {
            $discussion->byobu_flagged = true;

            $discussion->save();
        }
    }
}
