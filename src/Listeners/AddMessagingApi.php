<?php


namespace Flagrow\Messaging\Listeners;

use Flagrow\Messaging\Api\Controllers\MessageNotificationController;
use Flagrow\Messaging\Repositories\MessagesRepository;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Event\ConfigureApiRoutes;
use Flarum\Event\PrepareApiAttributes;
use Illuminate\Events\Dispatcher;

class AddMessagingApi
{
    /**
     * @var MessagesRepository
     */
    protected $messages;

    public function __construct(MessagesRepository $messages)
    {
        $this->messages = $messages;
    }
    /**
     * Subscribes to the Flarum api routes configuration event.
     *
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureApiRoutes::class, [$this, 'configureApiRoutes']);
        $events->listen(PrepareApiAttributes::class, [$this, 'prepareApiAttributes']);
    }

    /**
     * Registers our routes.
     *
     * @param ConfigureApiRoutes $event
     */
    public function configureApiRoutes(ConfigureApiRoutes $event)
    {
        $event->get('/messaging/notifications', 'flagrow.messaging.notifications', MessageNotificationController::class);
    }

    /**
     * Gets the api attributes and makes them available to the forum.
     *
     * @param PrepareApiAttributes $event
     */
    public function prepareApiAttributes(PrepareApiAttributes $event)
    {
        if ($event->isSerializer(ForumSerializer::class)) {
            $event->attributes['canMessage'] = $event->actor->can('flagrow.message');

            if ($event->attributes['canMessage']) {
                $event->attributes['flagrow.userMessages'] = $this->messages->findByUser($event->actor)->count();
            }
        }
    }
}
