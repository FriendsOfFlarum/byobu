<?php

namespace Flagrow\Messaging\Listeners;

use Flagrow\Messaging\Events\DiscussionMadePrivate;
use Flarum\Core\Exception\PermissionDeniedException;
use Flarum\Core\Exception\ValidationException;
use Flarum\Core\User;
use Flarum\Event\DiscussionWillBeSaved;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Contracts\Validation\Factory;
use Symfony\Component\Translation\TranslatorInterface;

class SaveRecipientsToDatabase
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
     * @param SettingsRepositoryInterface $settings
     * @param Factory $validator
     * @param TranslatorInterface $translator
     */
    public function __construct(SettingsRepositoryInterface $settings, Factory $validator, TranslatorInterface $translator)
    {
        $this->settings = $settings;
        $this->validator = $validator;
        $this->translator = $translator;
    }

    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(DiscussionWillBeSaved::class, [$this, 'whenDiscussionWillBeSaved']);
    }

    /**
     * @param DiscussionWillBeSaved $event
     * @throws PermissionDeniedException
     * @throws ValidationException
     */
    public function whenDiscussionWillBeSaved(DiscussionWillBeSaved $event)
    {
        $discussion = $event->discussion;
        $actor = $event->actor;

        if (isset($event->data['relationships']['recipients']['data'])) {
            $linkage = (array) $event->data['relationships']['recipients']['data'];

            $newRecipientsIds = [];
            foreach ($linkage as $link) {
                $newRecipientsIds[] = (int) $link['id'];
            }
            // Add the creator to the discussion.
            if (!in_array($actor->id, $newRecipientsIds)) {
                $newRecipientsIds[] = $actor->id;
            }

            $newRecipients = User::whereIn('id', $newRecipientsIds)->get();
            $newRecipientsIds = $newRecipients->lists('id')->all();

            if ($discussion->exists) {
                $oldRecipients = $discussion->recipients()->get();
                $oldRecipientIds = $oldRecipients->lists('id')->all();

                if ($oldRecipientIds == $newRecipientsIds) {
                    return;
                }

                $discussion->raise(
                    new DiscussionMadePrivate($discussion, $actor, $oldRecipients)
                );
            }

            $discussion->afterSave(function ($discussion) use ($newRecipientsIds) {
                $discussion->recipients()->sync($newRecipientsIds);
            });
        } elseif (! $discussion->exists && ! $actor->hasPermission('startPrivateDiscussion')) {
            throw new PermissionDeniedException;
        }
    }
}
