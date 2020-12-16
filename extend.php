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

use Flarum\Api\Controller;
use Flarum\Api\Serializer;
use Flarum\Discussion\Discussion;
use Flarum\Discussion\Event\Saving as DiscussionSaving;
use Flarum\Discussion\Event\Searching;
use Flarum\Event\ConfigureNotificationTypes;
use Flarum\Event\GetModelIsPrivate;
use Flarum\Extend as Native;
use Flarum\Group\Group;
use Flarum\Post\Event\Saving as PostSaving;
use Flarum\Post\Post;
use Flarum\User\Event\Saving as UserSaving;
use Flarum\User\User;
use FoF\Byobu\Discussion\Screener;
use FoF\Split\Events\DiscussionWasSplit;
use Illuminate\Contracts\Container\Container;
use Illuminate\Contracts\Events\Dispatcher;

return [
    (new Native\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),

    (new Native\Frontend('forum'))
        ->route('/private', 'byobuPrivate', Content\PrivateDiscussionsPage::class)
        ->css(__DIR__.'/resources/less/forum/extension.less')
        ->js(__DIR__.'/js/dist/forum.js'),

    new Native\Locales(__DIR__.'/resources/locale'),

    (new Extend\ApiAttribute())
        ->add(Serializer\ForumSerializer::class, Api\PermissionAttributes::class)
        ->add(Serializer\DiscussionSerializer::class, Api\PermissionAttributes::class)
        ->add(Serializer\BasicUserSerializer::class, Api\UserAttributes::class)
        ->add(Serializer\CurrentUserSerializer::class, Api\CurrentUserAttributes::class),

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

    (new Native\ApiController(Controller\ListDiscussionsController::class))
        ->addInclude(['recipientUsers', 'oldRecipientUsers', 'recipientGroups', 'oldRecipientGroups']),

    (new Native\ApiController(Controller\ShowDiscussionController::class))
        ->addInclude(['recipientUsers', 'oldRecipientUsers', 'recipientGroups', 'oldRecipientGroups']),

    (new Native\ApiSerializer(Serializer\BasicDiscussionSerializer::class))
        ->hasMany('recipientUsers', Serializer\UserSerializer::class)
        ->hasMany('oldRecipientUsers', Serializer\UserSerializer::class)
        ->hasMany('recipientGroups', Serializer\GroupSerializer::class)
        ->hasMany('oldRecipientGroups', Serializer\GroupSerializer::class),

    (new Native\ApiSerializer(Serializer\UserSerializer::class))
        ->hasMany('privateDiscussions', Serializer\DiscussionSerializer::class),

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

    (new Native\Policy())
        ->modelPolicy(Discussion::class, Access\DiscussionPolicy::class),

    (new Native\ModelVisibility(Discussion::class))
        ->scope(Access\ScopeDiscussionVisibility::class, 'viewPrivate'),

    (new Native\ModelVisibility(Post::class))
        ->scope(Access\ScopePostVisibility::class),

    (new Native\Post())
        ->type(Posts\RecipientLeft::class)
        ->type(Posts\RecipientsModified::class),

    (new Native\Notification())
        ->type(Notifications\DiscussionCreatedBlueprint::class, DiscussionSerializer::class, ['alert', 'email'])
        ->type(Notifications\DiscussionRepliedBlueprint::class, DiscussionSerializer::class, ['alert', 'email'])
        ->type(Notifications\DiscussionRecipientRemovedBlueprint::class, DiscussionSerializer::class, ['alert', 'email'])
        ->type(Notifications\DiscussionAddedBlueprint::class, DiscussionSerializer::class, ['alert', 'email']),

    function (Dispatcher $events, Container $container) {
        $container->bind('byobu.screener', Screener::class);

        $events->subscribe(Listeners\AddGambits::class);
        $events->subscribe(Listeners\CreatePostWhenRecipientsChanged::class);
        $events->subscribe(Listeners\QueueNotificationJobs::class);
    },
];
