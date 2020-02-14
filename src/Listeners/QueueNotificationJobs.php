<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) 2020 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Listeners;

use Flarum\Settings\SettingsRepositoryInterface;
use FoF\Byobu\Events\DiscussionMadePrivate;
use FoF\Byobu\Jobs;
use Illuminate\Events\Dispatcher;
use Symfony\Component\Translation\TranslatorInterface;

class QueueNotificationJobs
{
    protected $settings;
    
    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }
    
    public function subscribe(Dispatcher $events)
    {
        $events->listen(DiscussionMadePrivate::class, [$this, 'discussionMadePrivate']);
    }

    public function discussionMadePrivate(DiscussionMadePrivate $event)
    {
        app('flarum.queue.connection')->push(
            new Jobs\SendNotificationWhenPrivateDiscussionStarted($event->discussion, $event->newUsers)
        );
    }
}
