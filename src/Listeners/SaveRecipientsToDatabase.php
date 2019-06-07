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

    private $savingPrivateDiscussion;

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
        UserRepository $users
    ) {
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
        $events->listen(DiscussionSaving::class, [$this, 'whenSaving']);
        $events->listen(GetModelIsPrivate::class, [$this, 'markSavedDiscussionAsPrivate']);
    }

    /**
     * @param DiscussionSaving $event
     *
     * @throws PermissionDeniedException
     * @throws ValidationException
     */
    public function whenSaving(DiscussionSaving $event)
    {
        $discussion = $event->discussion;
        $actor = $event->actor;

        $newUserIds = collect(Arr::get($event->data, 'relationships.recipientUsers.data', []))
            ->map(function ($in) {
                return (int) $in['id'];
            });
        $newGroupIds = collect(Arr::get($event->data, 'relationships.recipientGroups.data', []))
            ->map(function ($in) {
                return (int) $in['id'];
            });

        $addsRecipients = !$newUserIds->isEmpty() || !$newGroupIds->isEmpty();

        if ($actor->cannot('startPrivateDiscussionWithBlockers')) {
            $newUserIds->each(function (int $userId) use ($actor) {
                if ($actor->id === $userId) {
                    return;
                }

                if ($this->users->findOrFail($userId)->getPreference('blocksPd', false)) {
                    throw new PermissionDeniedException('Not allowed to add users that blocked receiving private discussions');
                }
            });
        }

        // New discussion
        if ($discussion->exists) {
            if (!$newUserIds->isEmpty() && !$actor->can('discussion.editUserRecipients', $discussion)) {
                throw new PermissionDeniedException('Not allowed to edit users of a private discussion');
            }
            if (!$newGroupIds->isEmpty() && !$actor->can('discussion.editGroupRecipients', $discussion)) {
                throw new PermissionDeniedException('Not allowed to edit groups of a private discussion');
            }
        } else {
            if (!$newUserIds->isEmpty() && !$actor->hasPermission('discussion.startPrivateDiscussionWithUsers')) {
                throw new PermissionDeniedException('Not allowed to add users to a private discussion');
            }
            if (!$newGroupIds->isEmpty() && !$actor->hasPermission('discussion.startPrivateDiscussionWithGroups')) {
                throw new PermissionDeniedException('Not allowed to add groups to a private discussion');
            }
        }

        if ($addsRecipients) {
            $this->savingPrivateDiscussion = $discussion;

            $oldRecipients = [
                'groups' => $discussion->recipientGroups()->get(),
                'users'  => $discussion->recipientUsers()->get(),
            ];

            // Nothing changed.
            if ($oldRecipients['groups']->pluck('id')->all() == $newGroupIds->all()
                && $oldRecipients['users']->pluck('id')->all() == $newUserIds->all()
            ) {
                return;
            }

            $this->raiseEvent($oldRecipients, $newUserIds, $newGroupIds, $discussion, $actor);

            $discussion->afterSave(function (Discussion $discussion) use ($newGroupIds, $newUserIds, $oldRecipients) {
                foreach (['users', 'groups'] as $type) {
                    $variable = 'new'.Str::ucfirst(Str::singular($type)).'Ids';
                    $method = 'recipient'.Str::ucfirst($type);

                    $new = ${$variable};
                    $old = $oldRecipients[$type];

                    $recipients = collect($new->toArray())->merge($old->pluck('id')->toArray())->unique();
                    $discussion->{$method}()->sync($recipients->all());

                    $recipients->each(function ($id) use ($discussion, $method, $new) {
                        if ($new->contains($id)) {
                            $discussion->{$method}()->updateExistingPivot($id, [
                                'removed_at' => null,
                            ]);
                        } else {
                            $discussion->{$method}()->updateExistingPivot($id, [
                                'removed_at' => Carbon::now()->format(DateTime::RFC3339),
                            ]);
                        }
                    });
                }
            });
        }
    }

    /**
     * @param GetModelIsPrivate $event
     *
     * @return bool
     */
    public function markSavedDiscussionAsPrivate(GetModelIsPrivate $event)
    {
        $discussion = $event->model;

        if ($discussion === $this->savingPrivateDiscussion
            || ($discussion instanceof Discussion && ($discussion->recipientGroups()->count() || $discussion->recipientUsers()->count()))) {
            return true;
        }
    }

    /**
     * @param $oldRecipients
     * @param $newUserIds
     * @param $newGroupIds
     * @param $discussion
     * @param $actor
     */
    protected function raiseEvent($oldRecipients, $newUserIds, $newGroupIds, $discussion, $actor)
    {
        if ($oldRecipients['users']->isEmpty() && $oldRecipients['groups']->isEmpty()
            && (!$newUserIds->isEmpty() || !$newGroupIds->isEmpty())
        ) {
            $discussion->raise(
                new DiscussionMadePrivate(
                    $discussion,
                    $actor,
                    $newUserIds,
                    $newGroupIds,
                    $oldRecipients['users'],
                    $oldRecipients['groups']
                )
            );
        } elseif (!$oldRecipients['users']->isEmpty() && !$oldRecipients['groups']->isEmpty()
            && ($newUserIds->isEmpty() || $newGroupIds->isEmpty())
        ) {
            $discussion->raise(
                new DiscussionMadePublic(
                    $discussion,
                    $actor,
                    $newUserIds,
                    $newGroupIds,
                    $oldRecipients['users'],
                    $oldRecipients['groups']
                )
            );
        } else {
            $discussion->raise(
                new DiscussionRecipientsChanged(
                    $discussion,
                    $actor,
                    $newUserIds,
                    $newGroupIds,
                    $oldRecipients['users'],
                    $oldRecipients['groups']
                )
            );
        }
    }
}
