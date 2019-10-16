<?php

namespace FoF\Byobu\Listeners;

use Carbon\Carbon;
use DateTime;
use FoF\Byobu\Events\DiscussionMadePrivate;
use FoF\Byobu\Events\DiscussionMadePublic;
use FoF\Byobu\Events\DiscussionRecipientsChanged;
use Flarum\Discussion\Discussion;
use Flarum\Discussion\Event\Saving as DiscussionSaving;
use Flarum\Event\GetModelIsPrivate;
use Flarum\Foundation\ValidationException;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\Exception\PermissionDeniedException;
use Flarum\User\UserRepository;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Contracts\Validation\Factory;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Symfony\Component\Translation\TranslatorInterface;
use Flarum\Notification\NotificationSyncer;
use FoF\Byobu\Notifications\DiscussionCreatedBlueprint;
use Flarum\User\User;

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
        $privateDiscussion = $event->discussion;

        $recipients = $event->newUsers;
        $actor = $event->actor;

        foreach($recipients as $recipient){
            if($recipient === $actor->id){continue;} // Don't send to sender
            $user = User::where('id', $recipient)->first();
            $this->notifications->sync(new DiscussionCreatedBlueprint($privateDiscussion, $this->translator, $actor), [$user]);
        }
    }
}
