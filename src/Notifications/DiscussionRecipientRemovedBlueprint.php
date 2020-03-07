<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Notifications;

use Flarum\Discussion\Discussion;
use Flarum\Notification\Blueprint\BlueprintInterface;
use Flarum\Notification\MailableInterface;
use Flarum\User\User;

class DiscussionRecipientRemovedBlueprint implements BlueprintInterface, MailableInterface
{
    /**
     * @var User
     *           The user that was removed from the private discussion.
     */
    public $user;

    /**
     * @var Discussion
     */
    public $discussion;

    protected $sender;

    public function __construct(User $user, Discussion $discussion)
    {
        $this->user = $user;
        $this->discussion = $discussion;
    }

    /**
     * Get the user that sent the notification.
     *
     * @return \Flarum\User\User|null
     */
    public function getFromUser(): ?User
    {
        return $this->user;
    }

    /**
     * Get the model that is the subject of this activity.
     *
     * @return \Flarum\Database\AbstractModel|null
     */
    public function getSubject(): ?Discussion
    {
        return $this->discussion;
    }

    /**
     * Get the data to be stored in the notification.
     *
     * @return array|null
     */
    public function getData()
    {
        return [
            'user_left'  => $this->user->id,
            'discussion' => $this->discussion->id,
        ];
    }

    /**
     * Get the serialized type of this activity.
     *
     * @return string
     */
    public static function getType()
    {
        return 'byobuRecipientRemoved';
    }

    /**
     * Get the name of the model class for the subject of this activity.
     *
     * @return string
     */
    public static function getSubjectModel()
    {
        return Discussion::class;
    }

    /**
     * Get the name of the view to construct a notification email with.
     *
     * @return string
     */
    public function getEmailView()
    {
        return ['text' => 'fof-byobu::emails.byobuRecipientRemoved'];
    }

    /**
     * Get the subject line for a notification email.
     *
     * @return string
     */
    public function getEmailSubject()
    {
        return app('translator')->trans('fof-byobu.notifications.recipient_removed.title', [
            'user'       => $this->user->username,
            'title'      => $this->discussion->title,
        ]);
    }
}
