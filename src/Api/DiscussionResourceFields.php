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
                ->get(fn (Discussion $discussion) => $this->screener->fromDiscussion($discussion)->isPrivate()),

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
                    return $this->screener->fromDiscussion($discussion)->isPrivate()
                        && $context->getActor()->can('transformToPublic', $discussion);
                }),

            Schema\Relationship\ToMany::make('oldRecipientUsers')
                ->includable()
                ->type('users'),
            Schema\Relationship\ToMany::make('oldRecipientGroups')
                ->includable()
                ->type('groups'),
            Schema\Relationship\ToMany::make('recipientUsers')
                ->includable()
                ->writable()
                ->type('users'),
            Schema\Relationship\ToMany::make('recipientGroups')
                ->includable()
                ->writable()
                ->type('groups'),
        ];
    }
}
