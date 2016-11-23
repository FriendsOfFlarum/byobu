<?php

namespace Flagrow\Messaging\Repositories;

use Flagrow\Messaging\Models\Message;

class MessagesRepository
{
    /**
     * Find a user's notifications.
     *
     * @param User $user
     * @param int|null $limit
     * @param int $offset
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function findByUser(User $user, $limit = null, $offset = 0)
    {
        return Message::where('to_id', $user->id)
            ->latest('time')
            ->skip($offset)
            ->take($limit)
            ->get();
    }
}
