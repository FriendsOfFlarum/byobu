<?php

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
