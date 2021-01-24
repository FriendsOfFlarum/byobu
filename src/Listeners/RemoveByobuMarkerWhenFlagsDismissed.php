<?php

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
            $otherFlagsInDiscussion = Flag::whereIn('post_id', 
                Post::where('discussion_id', $discussion->id)
                    ->where('id', '!=', $event->post->id)
                    ->pluck('id'))
                    ->count();

            if ($otherFlagsInDiscussion === 0) {
                $discussion->byobu_flagged = false;
            }

            $discussion->save();
        }
    }
}
