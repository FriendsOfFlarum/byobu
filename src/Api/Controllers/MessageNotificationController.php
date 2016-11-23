<?php

namespace Flagrow\Messaging\Api\Controllers;

use Flagrow\Messaging\Api\Serializers\MessageSerializer;
use Flagrow\Messaging\Repositories\MessagesRepository;
use Flarum\Api\Controller\AbstractCollectionController;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class MessageNotificationController extends AbstractCollectionController
{
    public $serializer = MessageSerializer::class;

    /**
     * @var MessagesRepository
     */
    protected $messages;

    public function __construct(MessagesRepository $messages)
    {
        $this->messages = $messages;
    }

    /**
     * Get the data to be serialized and assigned to the response document.
     *
     * @param ServerRequestInterface $request
     * @param Document $document
     * @return mixed
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = $request->getAttribute('actor');

        if ($actor->isGuest()) {
            throw new PermissionDeniedException;
        }

//        $actor->markNotificationsAsRead()->save();

        $limit = $this->extractLimit($request);
        $offset = $this->extractOffset($request);
        $include = $this->extractInclude($request);

        $notifications = $this->messages->findByUser($actor, $limit, $offset)
            ->load($include)
            ->all();

        return $notifications;
    }
}
