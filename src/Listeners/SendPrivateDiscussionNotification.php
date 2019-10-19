<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Listeners;

use Flarum\Notification\NotificationSyncer;
use Flarum\Post\Event\Saving;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\User;
use Flarum\User\UserRepository;
use FoF\Byobu\Events\DiscussionMadePrivate;
use FoF\Byobu\Notifications\DiscussionCreatedBlueprint;
use FoF\Byobu\Notifications\DiscussionRepliedBlueprint;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Contracts\Validation\Factory;
use Symfony\Component\Translation\TranslatorInterface;

class SendPrivateDiscussionNotification
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @var Factory
     */
    protected $validator;

    /**
     * @var TranslatorInterface
     */
    protected $translator;

    /**
     * @var UserRepository
     */
    protected $users;

    /**
     * @var NotificationSyncer
     */
    protected $notifications;

    /**
     * @param SettingsRepositoryInterface $settings
     * @param Factory                     $validator
     * @param TranslatorInterface         $translator
     * @param UserRepository              $users
     */
    public function __construct(
        SettingsRepositoryInterface $settings,
        Factory $validator,
        TranslatorInterface $translator,
        UserRepository $users,
        NotificationSyncer $notifications
    ) {
        $this->settings = $settings;
        $this->validator = $validator;
        $this->translator = $translator;
        $this->users = $users;
        $this->notifications = $notifications;
    }

    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(DiscussionMadePrivate::class, [$this, 'discussionMadePrivate']);
        $events->listen(Saving::class, [$this, 'postMadeInPrivateDiscussion']);
    }

    public function discussionMadePrivate(DiscussionMadePrivate $event)
    {
        $privateDiscussion = $event->discussion;

        $recipients = $event->newUsers;
        $actor = $event->actor;

        foreach ($recipients as $recipient) {
            if ($recipient === $actor->id) {
                continue;
            } // Don't send to sender
            $user = User::where('id', $recipient)->first();
            $this->notifications->sync(new DiscussionCreatedBlueprint($privateDiscussion, $this->translator, $this->settings), [$user]);
        }
    }

    public function postMadeInPrivateDiscussion(Saving $event):void
    {
        $actor = $event->actor;
        
        $event->post->afterSave(function ($post) use ($actor) {
            if ($post->discussion->is_private) {
                
                foreach ($post->discussion->recipientUsers as $recipient) {
                    if ($recipient->id === $actor->id) {
                        continue;
                    } // Don't notify post author
                    $this->notifications->sync(new DiscussionRepliedBlueprint($post, $actor, $this->translator, $this->settings), [$recipient]);
                }
            }
        });
    }
}
