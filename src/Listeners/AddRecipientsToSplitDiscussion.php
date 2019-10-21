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

use Fof\Split\Events\DiscussionWasSplit;
use Illuminate\Contracts\Events\Dispatcher;

class AddRecipientsToSplitDiscussion
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(DiscussionWasSplit::class, [$this, 'addRecipients']);
    }

    /**
     * @param DiscussionWasSplit $event
     */
    public function addRecipients(DiscussionWasSplit $event)
    {
        $event->newDiscussion->recipientUsers()->sync(
            $event->originalDiscussion->recipientUsers()->allRelatedIds()->all()
        );
        $event->newDiscussion->recipientGroups()->sync(
            $event->originalDiscussion->recipientGroups()->allRelatedIds()->all()
        );
    }
}
