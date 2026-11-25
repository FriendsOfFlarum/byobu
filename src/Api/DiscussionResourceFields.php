<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Api;

use Flarum\Api\Context;
use Flarum\Api\Schema;
use Flarum\Discussion\Discussion;
use FoF\Byobu\Discussion\Screener;

class DiscussionResourceFields
{
    public function __construct(
        protected Screener $screener
    ) {
    }

    public function __invoke(): array
    {
        return [
            Schema\Boolean::make('isPrivateDiscussion')
                ->description('Whether this is a private discussion. Only its recipients can read it, and moderators where a post in it is flagged and they are allowed to.')
                ->get(fn (Discussion $discussion) => $this->screener->isPrivateDiscussion($discussion)),

            Schema\Boolean::make('canEditRecipients')
                ->get(function (Discussion $discussion, Context $context) {
                    $actor = $context->getActor();
                    $users = $actor->can('editUserRecipients', $discussion);
                    $groups = $actor->can('editGroupRecipients', $discussion);

                    return $discussion->is_private && ($users || $groups);
                }),
            Schema\Boolean::make('canEditUserRecipients')
                ->get(fn (Discussion $discussion, Context $context) => $context->getActor()->can('editUserRecipients', $discussion)),
            Schema\Boolean::make('canEditGroupRecipients')
                ->get(fn (Discussion $discussion, Context $context) => $context->getActor()->can('editGroupRecipients', $discussion)),
            Schema\Boolean::make('canMakePublic')
                ->get(function (Discussion $discussion, Context $context) {
                    return $this->screener->isPrivateDiscussion($discussion)
                        && $context->getActor()->can('transformToPublic', $discussion);
                }),
            Schema\Number::make('public')
                ->writable(function (Discussion $discussion, Context $context) {
                    return $this->screener->isPrivateDiscussion($discussion)
                        && $context->getActor()->can('transformToPublic', $discussion)
                        && $context->updating();
                })
                ->hidden()
                ->set(function (Discussion $discussion) {
                    $discussion->setAttribute('makingPublic', true);

                    Discussion::saving(function (Discussion $discussion) {
                        $discussion->offsetUnset('makingPublic');
                    });
                }),

            Schema\Relationship\ToMany::make('oldRecipientUsers')
                ->description('Members who left or were removed from this private discussion.')
                ->includable()
                ->type('users'),
            Schema\Relationship\ToMany::make('oldRecipientGroups')
                ->description('Groups removed from this private discussion.')
                ->includable()
                ->type('groups'),
            // Recipients are managed entirely by PersistRecipients (a Saving event listener).
            // We suppress the default BelongsToMany::sync() that Flarum's AbstractDatabaseResource
            // would otherwise call from saveFields(), because sync() would overwrite what
            // PersistRecipients::afterSave inserts — losing the actor-injection fix for #168
            // and any other recipient-count adjustments made during the Saving event.
            Schema\Relationship\ToMany::make('recipientUsers')
                ->description('The members who can read this private discussion.')
                ->includable()
                ->writable()
                ->type('users')
                ->save(fn () => null),
            Schema\Relationship\ToMany::make('recipientGroups')
                ->description('The groups whose members can read this private discussion.')
                ->includable()
                ->writable()
                ->type('groups')
                ->save(fn () => null),
        ];
    }
}
