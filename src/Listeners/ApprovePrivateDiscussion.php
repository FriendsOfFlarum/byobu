<?php

namespace Flagrow\Byobu\Listeners;

use Flarum\Event\PostWillBeSaved;
use Flarum\Extension\ExtensionManager;
use Illuminate\Contracts\Events\Dispatcher;

class ApprovePrivateDiscussion
{

    /**
     * @var ExtensionManager
     */
    protected $extensions;

    public function __construct(ExtensionManager $extensions)
    {
        $this->extensions = $extensions;
    }

    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(PostWillBeSaved::class, [$this, 'approvePosts'], 900);
    }

    /**
     * @param PostWillBeSaved $event
     */
    public function approvePosts(PostWillBeSaved $event)
    {
        if ($this->extensions->isEnabled('flarum-approval') &&
            (!$event->post->is_approved || !$event->post->discussion->is_approved) &&
            (!$event->post->discussion->recipientGroups->isEmpty() || !$event->post->discussion->recipientUsers->isEmpty())
        ) {
            $event->post->is_approved = true;
            $event->post->discussion->is_approved = true;
        }
    }
}
