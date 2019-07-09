<?php

namespace FoF\Byobu\Listeners;

use FoF\Byobu\Gambits\Discussion\ByobuGambit;
use FoF\Byobu\Gambits\Discussion\PrivacyGambit;
use FoF\Byobu\Gambits\User\AllowsPdGambit;
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
        $event->gambits->add(ByobuGambit::class);
    }

    public function addUserGambits(ConfigureUserGambits $event)
    {
        $event->gambits->add(AllowsPdGambit::class);
    }
}
