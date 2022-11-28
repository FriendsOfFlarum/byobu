<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Listeners;

use Flarum\Discussion\Event\Deleting as DiscussionDeleting;
use Flarum\Foundation\DispatchEventsTrait;
use Flarum\Settings\SettingsRepositoryInterface;
use FoF\Byobu\Events\AllRecipientsLeft;
use Illuminate\Contracts\Events\Dispatcher;

class AllRecipientsLeftHandler
{
    use DispatchEventsTrait;

    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings, Dispatcher $events)
    {
        $this->settings = $settings;
        $this->events = $events;
    }

    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(AllRecipientsLeft::class, [$this, 'whenAllRecipientsHaveLeft']);
    }

    public function whenAllRecipientsHaveLeft(AllRecipientsLeft $event)
    {
        // Once the discussion is hidden, we should check if we're meant to
        // fully delete the PD. If so, hard delete it.
        if (boolval($this->settings->get('fof-byobu.delete_on_last_recipient_left'))) {
            $this->events->dispatch(
                new DiscussionDeleting($event->discussion, $event->actor)
            );

            $event->discussion->delete();

            $this->dispatchEventsFor($event->discussion, $event->actor);
        }
    }
}
