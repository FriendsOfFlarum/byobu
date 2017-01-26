<?php

namespace Flagrow\Byobu\Listeners;

use Carbon\Carbon;
use DateTime;
use Flagrow\Byobu\Events\DiscussionMadePrivate;
use Flagrow\Byobu\Events\DiscussionMadePublic;
use Flagrow\Byobu\Events\DiscussionRecipientsChanged;
use Flarum\Core\Discussion;
use Flarum\Core\Exception\PermissionDeniedException;
use Flarum\Core\Exception\ValidationException;
use Flarum\Core\Repository\UserRepository;
use Flarum\Event\DiscussionWillBeSaved;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Contracts\Validation\Factory;
use Illuminate\Support\Arr;
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
     * @var UserRepository
     */
    protected $users;

    /**
     * @param SettingsRepositoryInterface $settings
     * @param Factory $validator
     * @param TranslatorInterface $translator
     */
    public function __construct(SettingsRepositoryInterface $settings, Factory $validator, TranslatorInterface $translator, UserRepository $users)
    {
        $this->settings = $settings;
        $this->validator = $validator;
        $this->translator = $translator;
        $this->users = $users;
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

        $newRecipientIds = collect(Arr::get($event->data, 'relationships.recipients.data', []))
            ->map(function ($link) {
                return (int)$link['id'];
            });

        if ($discussion->exists && $discussion->recipients && !$actor->can('editRecipients', $discussion)) {
            throw new PermissionDeniedException('not allowed to edit recipients');
        } elseif (!$newRecipientIds->isEmpty() && !$discussion->exist && !$actor->hasPermission('createPrivateDiscussions')) {
            throw new PermissionDeniedException('not allowed to create private discussion');
        } elseif (!$newRecipientIds->isEmpty()) {
            // Add the creator to the discussion.
            if (!in_array($actor->id, $newRecipientIds->all())) {
                $newRecipientIds->push($actor->id);
            }

            /** @var \Illuminate\Database\Eloquent\Collection $oldRecipients */
            $oldRecipients = $discussion->recipients()->get();
            /** @var \Illuminate\Support\Collection $oldRecipientIds */
            $oldRecipientIds = $oldRecipients->pluck('id');

            if ($oldRecipientIds->all() == $newRecipientIds->all()) {
                return;
            }
            if ($oldRecipients->isEmpty() && !$newRecipientIds->isEmpty()) {
                $discussion->raise(
                    new DiscussionMadePrivate($discussion, $actor, $oldRecipients)
                );
            } elseif (!$oldRecipients->isEmpty() && $newRecipientIds->isEmpty()) {
                $discussion->raise(
                    new DiscussionMadePublic($discussion, $actor, $oldRecipients)
                );
            } else {
                $discussion->raise(
                    new DiscussionRecipientsChanged($discussion, $actor, $oldRecipients)
                );
            }

            $discussion->afterSave(function (Discussion $discussion) use ($newRecipientIds, $oldRecipientIds) {
                $recipients = collect($oldRecipientIds->toArray())->merge($newRecipientIds->toArray())->unique();

                // Add all recipients to the Pivot table recipients.
                $discussion->recipients()->sync(
                    $recipients->all()
                );

                $recipients->each(function($id) use ($discussion, $newRecipientIds) {
                    if ($newRecipientIds->contains($id)) {
                        $discussion->recipients()->updateExistingPivot($id, [
                            'removed_at' => null
                        ]);
                    } else {
                        $discussion->recipients()->updateExistingPivot($id, [
                            'removed_at' => Carbon::now()->format(DateTime::RFC3339)
                        ]);
                    }
                });
            });
        }
    }
}
