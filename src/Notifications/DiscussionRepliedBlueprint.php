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
use Flarum\Post\Post;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\User;
use Symfony\Component\Translation\TranslatorInterface;

class DiscussionRepliedBlueprint implements BlueprintInterface, MailableInterface
{
    /**
     * @var Post
     */
    public $post;
    /**
     * @var Translator
     */
    protected $trans;
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    protected $sender;

    protected $actor;

    public function __construct(Post $post, User $actor, TranslatorInterface $trans, SettingsRepositoryInterface $settings)
    {
        $this->post = $post;
        $this->trans = $trans;
        $this->settings = $settings;
        $this->actor = $actor;
    }

    /**
     * Get the user that sent the notification.
     *
     * @return \Flarum\User\User|null
     */
    public function getFromUser():?User
    {
        return $this->actor;
    }

    /**
     * Get the model that is the subject of this activity.
     *
     * @return \Flarum\Database\AbstractModel|null
     */
    public function getSubject():?Discussion
    {
        return $this->post->discussion;
    }

    /**
     * Get the data to be stored in the notification.
     *
     * @return array|null
     */
    public function getData()
    {
        return ['postNumber' => $this->post->number];
    }

    /**
     * Get the serialized type of this activity.
     *
     * @return string
     */
    public static function getType()
    {
        return 'byobuPrivateDiscussionReplied';
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
        return ['text' => 'byobu::emails.privateDiscussionReplied'];
    }

    /**
     * Get the subject line for a notification email.
     *
     * @return string
     */
    public function getEmailSubject()
    {
        $forumName = $this->settings->get('forum_title');

        return $this->trans->trans('fof-byobu.notifications.private_discussion_replied.title', [
            'user'       => $this->actor->username,
            'title'      => $this->post->discussion->title,
            'forum-name' => $forumName,
        ]);
    }
}
