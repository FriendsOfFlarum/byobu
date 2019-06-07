<?php

namespace FoF\Byobu\Listeners;

use FoF\Byobu\Events\AbstractRecipientsEvent;
use FoF\Byobu\Events\DiscussionMadePrivate;
use FoF\Byobu\Events\DiscussionMadePublic;
use FoF\Byobu\Events\DiscussionRecipientsChanged;
use FoF\Byobu\Posts\RecipientsModified;
use Flarum\Event\ConfigurePostTypes;
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
    }

    /**
     * @param ConfigurePostTypes $event
     */
    public function addPostType(ConfigurePostTypes $event)
    {
        $event->add(RecipientsModified::class);
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
}
