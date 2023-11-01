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

use FoF\Split\Events\DiscussionWasSplit;

class AddRecipientsToSplitDiscussion
{
    /**
     * @param DiscussionWasSplit $event
     */
    public function handle(DiscussionWasSplit $event)
    {
        /** @phpstan-ignore-next-line */
        $event->newDiscussion->recipientUsers()->sync(
            /** @phpstan-ignore-next-line */
            $event->originalDiscussion->recipientUsers()->allRelatedIds()->all()
        );
        /** @phpstan-ignore-next-line */
        $event->newDiscussion->recipientGroups()->sync(
            /** @phpstan-ignore-next-line */
            $event->originalDiscussion->recipientGroups()->allRelatedIds()->all()
        );
    }
}
