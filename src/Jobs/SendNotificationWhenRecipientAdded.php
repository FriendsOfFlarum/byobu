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
use FoF\Byobu\Notifications\DiscussionAddedBlueprint;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Collection;

class SendNotificationWhenRecipientAdded implements ShouldQueue
{
    use Queueable;
    use SerializesModels;

    public function __construct(protected User $actor, protected Discussion $discussion, protected Collection $newUsers, protected Collection $oldUsers)
    {
    }

    public function handle(NotificationSyncer $notifications)
    {
        $recipients = $this->newUsers->diff($this->oldUsers);

        $notifications->sync(new DiscussionAddedBlueprint($this->actor, $this->discussion), $recipients->all());
    }
}
