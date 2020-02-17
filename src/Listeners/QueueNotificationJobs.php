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

use Flarum\Post\Event\Saving;
use FoF\Byobu\Events\DiscussionMadePrivate;
use FoF\Byobu\Jobs;
use Illuminate\Events\Dispatcher;

class QueueNotificationJobs
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(DiscussionMadePrivate::class, [$this, 'discussionMadePrivate']);
        $events->listen(Saving::class, [$this, 'postMadeInPrivateDiscussion']);
    }

    public function discussionMadePrivate(DiscussionMadePrivate $event)
    {
        app('flarum.queue.connection')->push(
            new Jobs\SendNotificationWhenPrivateDiscussionStarted($event->discussion, $event->newUsers)
        );
    }

    public function postMadeInPrivateDiscussion(Saving $event)
    {
        $actor = $event->actor;

        $event->post->afterSave(function ($post) use ($actor) {
            if ($post->discussion->recipientUsers->count() && $post->number !== 1) {
                app('flarum.queue.connection')->push(
                    new Jobs\SendNotificationWhenPostedInPrivateDiscussion($post, $actor)
                );
            }
        });
    }
}
