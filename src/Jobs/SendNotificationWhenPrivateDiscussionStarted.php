<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Jobs;

use Flarum\Discussion\Discussion;
use Flarum\Notification\NotificationSyncer;
use Flarum\User\User;
use FoF\Byobu\Notifications\DiscussionCreatedBlueprint;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Collection;

class SendNotificationWhenPrivateDiscussionStarted implements ShouldQueue
{
    use Queueable;
    use SerializesModels;

    /**
     * @var Discussion
     */
    protected $discussion;

    /**
     * @var Collection
     */
    protected $newUsers;

    protected $settings;

    public function __construct(
        Discussion $discussion,
        Collection $newUsers
    ) {
        $this->discussion = $discussion;
        $this->newUsers = $newUsers;
    }

    public function handle(NotificationSyncer $notifications)
    {
        $recipients = User::whereIn('id', $this->newUsers)
            ->whereNotIn('id', [$this->discussion->user_id])
            ->get();

        $notifications->sync(new DiscussionCreatedBlueprint($this->discussion), $recipients->all());
    }
}
