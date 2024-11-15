<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Notifications;

use Flarum\Notification\AlertableInterface;
use Flarum\Discussion\Discussion;
use Flarum\Notification\Blueprint\BlueprintInterface;
use Flarum\Notification\MailableInterface;
use Flarum\User\User;
use Symfony\Contracts\Translation\TranslatorInterface;

class DiscussionRecipientRemovedBlueprint implements BlueprintInterface, MailableInterface, AlertableInterface
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

    public function getFromUser(): ?\Flarum\User\User
    {
        return $this->user;
    }

    public function getSubject(): ?\Flarum\Database\AbstractModel
    {
        return $this->discussion;
    }

    /**
     * Get the data to be stored in the notification.
     *
     * @return array|null
     */
    public function getData(): mixed
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
    public static function getType(): string
    {
        return 'byobuRecipientRemoved';
    }

    /**
     * Get the name of the model class for the subject of this activity.
     *
     * @return string
     */
    public static function getSubjectModel(): string
    {
        return Discussion::class;
    }

    /**
     * Get the name of the view to construct a notification email with.
     *
     * @return array
     */
    public function getEmailViews(): array
    {
        return ['text' => 'fof-byobu::email.plain.byobuRecipientRemoved', 'html' => 'fof-byobu::email.html.byobuRecipientRemoved'];
    }

    /**
     * Get the subject line for a notification email.
     *
     * @return string
     */
    public function getEmailSubject(\Flarum\Locale\TranslatorInterface $translator): string
    {
        return $translator->trans('fof-byobu.email.subject.recipient_removed', [
            '{display_name}'       => $this->user->display_name,
            '{title}'              => $this->discussion->title,
        ]);
    }
}
