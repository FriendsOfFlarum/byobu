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
use Flarum\Api\Serializer\CurrentUserSerializer;
use Flarum\Api\Serializer\DiscussionSerializer;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Discussion\Discussion;
use Flarum\Discussion\Event\Saving as DiscussionSaving;
use Flarum\Discussion\Event\Searching;
use Flarum\Event\ConfigureNotificationTypes;
use Flarum\Event\GetModelIsPrivate;
use Flarum\Extend as Native;
use Flarum\Group\Group;
use Flarum\Post\Event\Saving as PostSaving;
use Flarum\User\Event\Saving as UserSaving;
use Flarum\User\User;
use FoF\Byobu\Discussion\Screener;
use FoF\Components\Extend\AddFofComponents;
use FoF\Split\Events\DiscussionWasSplit;
use Illuminate\Contracts\Container\Container;
use Illuminate\Contracts\Events\Dispatcher;

return [
    new AddFofComponents(),

    (new Native\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),

    (new Native\Frontend('forum'))
        ->route('/private', 'byobuPrivate', Content\PrivateDiscussionsPage::class)
        ->css(__DIR__.'/resources/less/forum/extension.less')
        ->js(__DIR__.'/js/dist/forum.js'),

    new Native\Locales(__DIR__.'/resources/locale'),

    (new Extend\ApiAttribute())
        ->add(ForumSerializer::class, Api\PermissionAttributes::class)
        ->add(DiscussionSerializer::class, Api\PermissionAttributes::class)
        ->add(BasicUserSerializer::class, Api\UserAttributes::class)
        ->add(CurrentUserSerializer::class, Api\CurrentUserAttributes::class),

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

    (new Native\Event())
        ->listen(DiscussionSaving::class, Listeners\PersistRecipients::class)
        ->listen(DiscussionSaving::class, Listeners\DropTagsOnPrivateDiscussions::class)
        ->listen(PostSaving::class, Listeners\IgnoreApprovals::class)
        ->listen(UserSaving::class, Listeners\SaveUserPreferences::class)
        ->listen(GetModelIsPrivate::class, Listeners\GetModelIsPrivate::class)
        ->listen(Searching::class, Listeners\UnifiedIndex::class)
        ->listen(DiscussionWasSplit::class, Listeners\AddRecipientsToSplitDiscussion::class),

    (new Native\View())
        ->namespace('fof-byobu', __DIR__.'/resources/views'),

    function (Dispatcher $events, Container $container) {
        $container->bind('byobu.screener', Screener::class);

        $events->subscribe(Access\DiscussionPolicy::class);
        $events->subscribe(Access\PostPolicy::class);
        $events->subscribe(Listeners\AddGambits::class);
        $events->subscribe(Listeners\AddRecipientsRelationships::class);
        $events->subscribe(Listeners\CreatePostWhenRecipientsChanged::class);
        $events->subscribe(Listeners\QueueNotificationJobs::class);

        // Add notifications
        $events->listen(ConfigureNotificationTypes::class, function (ConfigureNotificationTypes $event) {
            $event->add(Notifications\DiscussionCreatedBlueprint::class, DiscussionSerializer::class, ['alert', 'email']);
            $event->add(Notifications\DiscussionRepliedBlueprint::class, DiscussionSerializer::class, ['alert', 'email']);
            $event->add(Notifications\DiscussionRecipientRemovedBlueprint::class, DiscussionSerializer::class, ['alert', 'email']);
            $event->add(Notifications\DiscussionAddedBlueprint::class, DiscussionSerializer::class, ['alert', 'email']);
        });
    },
];
