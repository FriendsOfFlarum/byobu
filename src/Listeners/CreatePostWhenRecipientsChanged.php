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
use FoF\Byobu\Events\DiscussionMadePrivate;
use FoF\Byobu\Events\DiscussionMadePublic;
use FoF\Byobu\Events\DiscussionRecipientRemovedSelf;
use FoF\Byobu\Events\DiscussionRecipientsChanged;
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
        $events->listen(DiscussionMadePrivate::class, [$this, 'whenDiscussionWasTagged']);
        $events->listen(DiscussionMadePublic::class, [$this, 'whenDiscussionWasTagged']);
        $events->listen(DiscussionRecipientsChanged::class, [$this, 'whenDiscussionWasTagged']);
        $events->listen(DiscussionRecipientRemovedSelf::class, [$this, 'whenActorRemovedSelf']);
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
        if ($event->oldUsers->isEmpty() && $event->oldGroups->isEmpty()) {
            return;
        }

        $post = RecipientsModified::reply($event);

        $event->discussion->mergePost($post);
    }

    public function whenActorRemovedSelf(DiscussionRecipientRemovedSelf $event)
    {
        if ($event->oldUsers->isEmpty() && $event->oldGroups->isEmpty()) {
            return;
        }

        $post = RecipientLeft::reply($event);

        $event->discussion->mergePost($post);
    }
}
