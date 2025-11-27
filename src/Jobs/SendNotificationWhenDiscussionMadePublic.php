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

use Flarum\Discussion\Discussion;
use Flarum\Notification\NotificationSyncer;
use Flarum\User\User;
use FoF\Byobu\Notifications\DiscussionMadePublicBlueprint;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Collection;

class SendNotificationWhenDiscussionMadePublic implements ShouldQueue
{
    use Queueable;
    use SerializesModels;

    /**
     * @var Collection
     */
    protected $newUsers;

    public function __construct(protected User $actor, protected Discussion $discussion, protected Collection $oldUsers)
    {
    }

    public function handle(NotificationSyncer $notifications)
    {
        $recipients = $this->oldUsers->reject(function ($user) {
            return $user->id === $this->actor->id;
        });

        $notifications->sync(new DiscussionMadePublicBlueprint($this->actor, $this->discussion), $recipients->all());
    }
}
