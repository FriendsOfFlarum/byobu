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
use Flarum\Post\Post;
use Flarum\User\User;
use Symfony\Contracts\Translation\TranslatorInterface;

class DiscussionRepliedBlueprint implements BlueprintInterface, MailableInterface, AlertableInterface
{
    /**
     * @var Post
     */
    public $post;

    protected $sender;

    protected $actor;

    public function __construct(Post $post, User $actor)
    {
        $this->post = $post;
        $this->actor = $actor;
    }

    public function getFromUser(): ?\Flarum\User\User
    {
        return $this->actor;
    }

    public function getSubject(): ?\Flarum\Database\AbstractModel
    {
        return $this->post->discussion;
    }

    /**
     * Get the data to be stored in the notification.
     *
     * @return array|null
     */
    public function getData(): mixed
    {
        return ['postNumber' => $this->post->number];
    }

    /**
     * Get the serialized type of this activity.
     *
     * @return string
     */
    public static function getType(): string
    {
        return 'byobuPrivateDiscussionReplied';
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
        return ['text' => 'fof-byobu::email.plain.privateDiscussionReplied', 'html' => 'fof-byobu::email.html.privateDiscussionReplied'];
    }

    /**
     * Get the subject line for a notification email.
     *
     * @return string
     */
    public function getEmailSubject(\Flarum\Locale\TranslatorInterface $translator): string
    {
        return $translator->trans('fof-byobu.email.subject.private_discussion_replied', [
            '{display_name}'       => $this->actor->display_name,
            '{title}'              => $this->post->discussion->title,
        ]);
    }
}
