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

use Flarum\Discussion\Discussion;
use Flarum\Flags\Event\FlagsWillBeDeleted;
use Flarum\Flags\Flag;
use Flarum\Post\Post;

class RemoveByobuMarkerWhenFlagsDismissed
{
    public function handle(FlagsWillBeDeleted $event)
    {
        $discussion = Discussion::find($event->post->discussion_id);

        if ($discussion && $discussion->is_private) {
            $otherFlagsInDiscussion = Flag::whereIn(
                'post_id',
                Post::where('discussion_id', $discussion->id)
                    ->where('id', '!=', $event->post->id)
                    ->pluck('id')
            )
                    ->count();

            if ($otherFlagsInDiscussion === 0) {
                $discussion->byobu_flagged = false;
            }

            $discussion->save();
        }
    }
}
