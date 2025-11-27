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

class ForumResourceFields
{
    public function __invoke(): array
    {
        return [
            Schema\Boolean::make('canStartPrivateDiscussion')
                ->get(function ($forum, Context $context) {
                    return $context->getActor()->can('discussion.startPrivateDiscussionWithUsers')
                        || $context->getActor()->can('discussion.startPrivateDiscussionWithGroups');
                }),
            Schema\Boolean::make('canStartPrivateDiscussionWithUsers')
                ->get(function ($forum, Context $context) {
                    return $context->getActor()->can('discussion.startPrivateDiscussionWithUsers');
                }),
            Schema\Boolean::make('canAddMoreThanTwoUserRecipients')
                ->get(function ($forum, Context $context) {
                    return $context->getActor()->can('discussion.addMoreThanTwoUserRecipients');
                }),
            Schema\Boolean::make('canStartPrivateDiscussionWithGroups')
                ->get(function ($forum, Context $context) {
                    return $context->getActor()->can('discussion.startPrivateDiscussionWithGroups');
                }),
            Schema\Boolean::make('canStartPrivateDiscussionWithBlockers')
                ->get(function ($forum, Context $context) {
                    return $context->getActor()->can('discussion.startPrivateDiscussionWithBlockers');
                }),
        ];
    }
}
