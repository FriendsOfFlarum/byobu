<?php

namespace Flagrow\Messaging\Repositories;

use Flagrow\Messaging\Models\Discussion;
use Flarum\Core\User;
use Illuminate\Database\Eloquent\Builder;

class MessagesRepository
{
    /**
     * Find a users' private discussions.
     *
     * @param User $user
     * @return Builder
     */
    public function findDiscussionsByUser(User $user): Builder
    {
        return Discussion::query()
            ->with('messages')
            ->whereHas('recipients', function (Builder $q) use ($user) {
                $q->where('users.id', $user->id);
            })
            ->latest('updated_at');
    }

    /**
     * Find a users' unread private discussions.
     *
     * @param User $user
     * @return Builder
     */
    public function findUnreadDiscussionsByUser(User $user): Builder
    {
        return Discussion::query()
            ->with('messages')
            ->whereHas('recipients', function (Builder $q) use ($user) {
                $q
                    ->where('users.id', $user->id)
                    ->where(
                        'flagrow_private_recipients.last_message_read_at',
                        '<=',
                        'flagrow_private_discussions.updated_at'
                    );
            })
            ->latest('updated_at');
    }
}
