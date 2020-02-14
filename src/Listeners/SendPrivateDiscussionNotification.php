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
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\User;
use Flarum\User\UserRepository;
use FoF\Byobu\Events\DiscussionMadePrivate;
use FoF\Byobu\Notifications\DiscussionCreatedBlueprint;
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
    }

    public function discussionMadePrivate(DiscussionMadePrivate $event)
    {
        $recipients = User::whereIn('id', $event->newUsers)->whereNotIn('id', [$event->actor->id])->get();

        $this->notifications->sync(new DiscussionCreatedBlueprint($event->discussion, $this->translator, $this->settings), $recipients->all());
    }
}
