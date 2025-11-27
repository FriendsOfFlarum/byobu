<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Jobs;

use Flarum\Notification\NotificationSyncer;
use Flarum\Post\Post;
use Flarum\User\User;
use FoF\Byobu\Notifications\DiscussionRepliedBlueprint;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\SerializesModels;

class SendNotificationWhenPostedInPrivateDiscussion implements ShouldQueue
{
    use Queueable;
    use SerializesModels;

    protected mixed $settings;

    public function __construct(protected Post $post, protected User $actor)
    {
    }

    public function handle(NotificationSyncer $notifications): void
    {
        /** @phpstan-ignore-next-line */
        $recipientUsers = $this->post->discussion->recipientUsers->reject(function ($user) {
            return $user->id === $this->actor->id;
        });

        /** @phpstan-ignore-next-line */
        $groups = $this->post->discussion->recipientGroups->pluck('id')->toArray();

        $recipientGroupUsers = User::leftJoin('group_user', 'users.id', 'group_user.user_id')
            ->whereIn('group_user.group_id', $groups)
            ->whereNotIn('users.id', [$this->actor->id])
            ->get();

        $recipients = $recipientUsers->merge($recipientGroupUsers);

        $notifications->sync(new DiscussionRepliedBlueprint($this->post, $this->actor), $recipients->all());
    }
}
