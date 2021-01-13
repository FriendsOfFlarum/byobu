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
use Flarum\Event\GetModelIsPrivate as Event;
use FoF\Byobu\Discussion\Screener;

class GetModelIsPrivate
{
    public function handle(Event $event)
    {
        $discussion = null;

        // Only affect the private state of discussions,
        // not posts contained within.
        if ($event->model instanceof Discussion) {
            $discussion = $event->model;
        }

        if ($discussion) {
            /** @var Screener $screener */
            $screener = app('byobu.screener');
            $screener = $screener->fromDiscussion($discussion);

            // Unless we think it's private, delegate the check further
            // along the pipeline to other listeners.
            return $screener->isPrivate() ?: null;
        }
    }
}
