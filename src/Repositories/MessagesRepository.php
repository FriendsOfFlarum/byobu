<?php

namespace Flagrow\Messaging\Repositories;

use Flagrow\Messaging\Models\Message;
use Flarum\Core\User;
use Illuminate\Database\Eloquent\Builder;

class MessagesRepository
{
    /**
     * Find a user's notifications.
     *
     * @param User $user
     * @param int|null $limit
     * @param int $offset
     * @return Builder
     */
    public function findByUser(User $user, $limit = null, $offset = 0): Builder
    {
        return Message::query()->where('to_id', $user->id)
            ->latest('created_at')
            ->skip($offset)
            ->take($limit);
    }
}
