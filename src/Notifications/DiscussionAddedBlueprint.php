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

class DiscussionAddedBlueprint implements BlueprintInterface, MailableInterface, AlertableInterface
{
    /**
     * @var Discussion
     */
    public $discussion;

    /**
     * @var User
     */
    public $actor;

    public function __construct(User $actor, Discussion $discussion)
    {
        $this->actor = $actor;
        $this->discussion = $discussion;
    }

    public function getFromUser(): ?\Flarum\User\User
    {
        return $this->actor;
    }

    public function getSubject(): ?\Flarum\Database\AbstractModel
    {
        return $this->discussion;
    }

    public function getData(): mixed
    {
        return [];
    }

    /**
     * Get the serialized type of this activity.
     *
     * @return string
     */
    public static function getType(): string
    {
        return 'byobuPrivateDiscussionAdded';
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
        return ['text' => 'fof-byobu::email.plain.privateDiscussionAdded', 'html' => 'fof-byobu::email.html.privateDiscussionAdded'];
    }

    /**
     * Get the subject line for a notification email.
     *
     * @return string
     */
    public function getEmailSubject(\Flarum\Locale\TranslatorInterface $translator): string
    {
        return $translator->trans('fof-byobu.email.subject.private_discussion_added', [
            '{display_name}'       => $this->actor->display_name,
            '{title}'              => $this->discussion->title,
        ]);
    }
}
