<?php

namespace Flagrow\Byobu\Listeners;

use Flagrow\Byobu\Events\DiscussionMadePrivate;
use Flagrow\Byobu\Posts\RecipientsModified;
use Flarum\Event\ConfigurePostTypes;
use Illuminate\Contracts\Events\Dispatcher;

class CreatePostWhenTagsAreChanged
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigurePostTypes::class, [$this, 'addPostType']);
        $events->listen(DiscussionMadePrivate::class, [$this, 'whenDiscussionWasTagged']);
    }

    /**
     * @param ConfigurePostTypes $event
     */
    public function addPostType(ConfigurePostTypes $event)
    {
        $event->add(RecipientsModified::class);
    }

    /**
     * @param DiscussionMadePrivate $event
     */
    public function whenDiscussionWasTagged(DiscussionMadePrivate $event)
    {
        $post = RecipientsModified::reply(
            $event->discussion->id,
            $event->actor->id,
            $event->oldRecipients->lists('id')->all(),
            $event->discussion->recipients()->lists('id')->all()
        );

        $event->discussion->mergePost($post);
    }
}
