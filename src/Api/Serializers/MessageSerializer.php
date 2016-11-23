<?php

namespace Flagrow\Messaging\Api\Serializers;

use Flagrow\Messaging\Models\Message;
use Flarum\Api\Serializer\AbstractSerializer;

class MessageSerializer extends AbstractSerializer
{
    /**
     * {@inheritdoc}
     */
    protected $type = 'messages';

    /**
     * Get the default set of serialized attributes for a model.
     *
     * @param Message|array $message
     * @return array
     */
    protected function getDefaultAttributes($message)
    {
        return [
            'id' => $message->id,
            'content' => $message->content,
            'createdAt' => $this->formatDate($message->created_at),
            'updatedAt' => $this->formatDate($message->updated_at),
            'readAt' => $this->formatDate($message->read_at)
        ];
    }

    protected function to($message)
    {
        return $this->hasOne($message, 'Flarum\Api\Serializer\UserBasicSerializer');
    }

    protected function from($message)
    {
        return $this->hasOne($message, 'Flarum\Api\Serializer\UserBasicSerializer');
    }
}
