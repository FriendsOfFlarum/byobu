<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu;

use Flarum\Api\Serializer\BasicUserSerializer;
use Flarum\Api\Serializer\DiscussionSerializer;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Discussion\Discussion;
use Flarum\Discussion\Event\Saving;
use Flarum\Event\ConfigureNotificationTypes;
use Flarum\Extend as Native;
use Flarum\Group\Group;
use Flarum\User\Event\Saving as UserSaving;
use Flarum\User\User;
use FoF\Components\Extend\AddFofComponents;
use FoF\Split\Events\DiscussionWasSplit;
use Illuminate\Contracts\Events\Dispatcher;

return [
    new AddFofComponents(),

    (new Native\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),

    (new Native\Frontend('forum'))
        ->css(__DIR__.'/resources/less/forum/extension.less')
        ->js(__DIR__.'/js/dist/forum.js'),

    new Native\Locales(__DIR__.'/resources/locale'),

    new Extend\UserPreference('blocksPd', function ($value) {
        return boolval($value);
    }, false),

    (new Extend\ApiAttribute())
        ->add(ForumSerializer::class, Api\PermissionAttributes::class)
        ->add(DiscussionSerializer::class, Api\PermissionAttributes::class)
        ->add(BasicUserSerializer::class, Api\UserAttributes::class),

    (new Native\Model(Discussion::class))
        ->relationship('recipientUsers', function ($discussion) {
            return $discussion->belongsToMany(User::class, 'recipients')
                ->withTimestamps()
                ->wherePivot('removed_at', null);
        })
        ->relationship('oldRecipientUsers', function ($discussion) {
            return $discussion->belongsToMany(User::class, 'recipients')
                ->withTimestamps()
                ->wherePivot('removed_at', '!=', null);
        })
        ->relationship('recipientGroups', function ($discussion) {
            return $discussion->belongsToMany(Group::class, 'recipients')
                ->withTimestamps()
                ->wherePivot('removed_at', null);
        })
        ->relationship('oldRecipientGroups', function ($discussion) {
            return $discussion->belongsToMany(Group::class, 'recipients')
                ->withTimestamps()
                ->wherePivot('removed_at', '!=', null);
        }),

    (new Native\Model(User::class))
        ->relationship('privateDiscussions', function ($user) {
            return $user->belongsToMany(Discussion::class, 'recipients')
                ->withTimestamps()
                ->wherePivot('removed_at', null);
        }),

    (new Native\Model(Group::class))
        ->relationship('privateDiscussions', function ($group) {
            return $group->belongsToMany(Discussion::class, 'recipients')
                ->withTimestamps()
                ->wherePivot('removed_at', null);
        }),

    (new Native\View())
        ->namespace('fof-byobu', __DIR__.'/resources/views'),

    function (Dispatcher $events) {
        $events->subscribe(Access\DiscussionPolicy::class);
        $events->subscribe(Listeners\AddApiAttributes::class);
        $events->subscribe(Listeners\AddGambits::class);
        $events->subscribe(Listeners\AddRecipientsRelationships::class);
        $events->subscribe(Listeners\CreatePostWhenRecipientsChanged::class);
        $events->subscribe(Listeners\SaveRecipientsToDatabase::class);
        $events->subscribe(Listeners\QueueNotificationJobs::class);

        $events->listen(Saving::class, Listeners\CheckTags::class);
        $events->listen(UserSaving::class, Listeners\SaveBlocksPdPreference::class);

        // Support for fof/split
        $events->listen(DiscussionWasSplit::class, Listeners\AddRecipientsToSplitDiscussion::class);

        // Add notifications
        $events->listen(ConfigureNotificationTypes::class, function (ConfigureNotificationTypes $event) {
            $event->add(Notifications\DiscussionCreatedBlueprint::class, DiscussionSerializer::class, ['alert', 'email']);
            $event->add(Notifications\DiscussionRepliedBlueprint::class, DiscussionSerializer::class, ['alert', 'email']);
            $event->add(Notifications\DiscussionRecipientRemovedBlueprint::class, DiscussionSerializer::class, ['alert', 'email']);
            $event->add(Notifications\DiscussionAddedBlueprint::class, DiscussionSerializer::class, ['alert', 'email']);
            $event->add(Notifications\DiscussionMadePublicBlueprint::class, DiscussionSerializer::class, ['alert', 'email']);
        });
    },
];
