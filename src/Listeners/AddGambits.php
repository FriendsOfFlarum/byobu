<?php

namespace Flagrow\Byobu\Listeners;

use Flagrow\Byobu\Gambits\Discussion\PrivacyGambit;
use Flagrow\Byobu\Gambits\User\BlocksPdGambit;
use Flarum\Event\ConfigureDiscussionGambits;
use Flarum\Event\ConfigureUserGambits;
use Illuminate\Contracts\Events\Dispatcher;

class AddGambits
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureDiscussionGambits::class, [$this, 'addDiscussionGambit']);
        $events->listen(ConfigureUserGambits::class, [$this, 'addUserGambits']);
    }

    /**
     * @param ConfigureDiscussionGambits $event
     */
    public function addDiscussionGambit(ConfigureDiscussionGambits $event)
    {
        $event->gambits->add(PrivacyGambit::class);
    }

    public function addUserGambits(ConfigureUserGambits $event)
    {
        $event->gambits->add(BlocksPdGambit::class);
    }
}
