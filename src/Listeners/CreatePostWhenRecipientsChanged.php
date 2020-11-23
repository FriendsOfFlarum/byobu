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

use Flarum\Event\ConfigurePostTypes;
use FoF\Byobu\Events\AbstractRecipientsEvent;
use FoF\Byobu\Events\Created;
use FoF\Byobu\Events\DiscussionMadePublic;
use FoF\Byobu\Events\RecipientsChanged;
use FoF\Byobu\Events\RemovedSelf;
use FoF\Byobu\Posts\RecipientLeft;
use FoF\Byobu\Posts\RecipientsModified;
use Illuminate\Contracts\Events\Dispatcher;

class CreatePostWhenRecipientsChanged
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigurePostTypes::class, [$this, 'addPostType']);
        $events->listen(Created::class, [$this, 'whenDiscussionWasTagged']);
        $events->listen(DiscussionMadePublic::class, [$this, 'whenDiscussionWasTagged']);
        $events->listen(RecipientsChanged::class, [$this, 'whenDiscussionWasTagged']);
        $events->listen(RemovedSelf::class, [$this, 'whenActorRemovedSelf']);
    }

    /**
     * @param ConfigurePostTypes $event
     */
    public function addPostType(ConfigurePostTypes $event)
    {
        $event->add(RecipientsModified::class);
        $event->add(RecipientLeft::class);
    }

    /**
     * @param AbstractRecipientsEvent $event
     */
    public function whenDiscussionWasTagged(AbstractRecipientsEvent $event)
    {
        $post = RecipientsModified::reply($event);

        $event->discussion->mergePost($post);
    }

    public function whenActorRemovedSelf(RemovedSelf $event)
    {
        $post = RecipientLeft::reply($event);

        $event->discussion->mergePost($post);
    }
}
