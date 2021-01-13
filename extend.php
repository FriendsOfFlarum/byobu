<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) 2019 - 2021 FriendsOfFlarum.
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
use Flarum\Event\GetModelIsPrivate;
use Flarum\Extend;
use Flarum\Group\Group;
use Flarum\Post\Event\Saving as PostSaving;
use Flarum\Post\Post;
use Flarum\User\Event\Saving as UserSaving;
use Flarum\User\User;
use FoF\Components\Extend\AddFofComponents;
use FoF\Split\Events\DiscussionWasSplit;
use Illuminate\Contracts\Events\Dispatcher;

return [
    (new AddFofComponents()),

    (new Extend\Frontend('admin'))
        ->css(__DIR__.'/resources/less/admin.less')
        ->js(__DIR__.'/js/dist/admin.js'),

    (new Extend\Frontend('forum'))
        ->route('/private', 'byobuPrivate', Content\PrivateDiscussionsPage::class)
        ->css(__DIR__.'/resources/less/forum/extension.less')
        ->js(__DIR__.'/js/dist/forum.js'),

    new Extend\Locales(__DIR__.'/resources/locale'),

    (new Extend\Model(Discussion::class))
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

    (new Extend\Model(User::class))
        ->relationship('privateDiscussions', function ($user) {
            return $user->belongsToMany(Discussion::class, 'recipients')
                ->withTimestamps()
                ->wherePivot('removed_at', null);
        }),

    (new Extend\Model(Group::class))
        ->relationship('privateDiscussions', function ($group) {
            return $group->belongsToMany(Discussion::class, 'recipients')
                ->withTimestamps()
                ->wherePivot('removed_at', null);
        }),

    (new Extend\ApiController(Controller\ListDiscussionsController::class))
        ->addInclude(['recipientUsers', 'oldRecipientUsers', 'recipientGroups', 'oldRecipientGroups']),

    (new Extend\ApiController(Controller\ShowDiscussionController::class))
        ->addInclude(['recipientUsers', 'oldRecipientUsers', 'recipientGroups', 'oldRecipientGroups']),

    (new Extend\ApiSerializer(Serializer\BasicDiscussionSerializer::class))
        ->hasMany('recipientUsers', Serializer\UserSerializer::class)
        ->hasMany('oldRecipientUsers', Serializer\UserSerializer::class)
        ->hasMany('recipientGroups', Serializer\GroupSerializer::class)
        ->hasMany('oldRecipientGroups', Serializer\GroupSerializer::class),

    (new Extend\ApiSerializer(Serializer\DiscussionSerializer::class))
        ->mutate(Api\DiscussionPermissionAttributes::class),

    (new Extend\ApiSerializer(Serializer\ForumSerializer::class))
        ->mutate(Api\ForumPermissionAttributes::class),

    (new Extend\ApiSerializer(Serializer\BasicUserSerializer::class))
        ->attribute('blocksPd', function ($serializer, $user) {
            return (bool) $user->blocks_byobu_pd;
        })
        ->attribute('unifiedIndex', function ($serializer, $user) {
            return  (bool) $user->unified_index_with_byobu;
        })
        ->attribute('cannotBeDirectMessaged', function ($serializer, $user) {
            return (bool) $serializer->getActor()->can('cannotBeDirectMessaged', $user);
        }),

    (new Extend\ApiSerializer(Serializer\UserSerializer::class))
        ->hasMany('privateDiscussions', Serializer\DiscussionSerializer::class),

    (new Extend\View())
        ->namespace('fof-byobu', __DIR__.'/resources/views'),

    (new Extend\Policy())
        ->modelPolicy(Discussion::class, Access\DiscussionPolicy::class),

    (new Extend\ModelVisibility(Discussion::class))
        ->scope(Access\ScopeDiscussionVisibility::class, 'viewPrivate'),

    (new Extend\ModelVisibility(Post::class))
        ->scope(Access\ScopePostVisibility::class),

    (new Extend\Post())
        ->type(Posts\RecipientLeft::class)
        ->type(Posts\RecipientsModified::class),

    (new Extend\Notification())
        ->type(Notifications\DiscussionCreatedBlueprint::class, Serializer\DiscussionSerializer::class, ['alert', 'email'])
        ->type(Notifications\DiscussionRepliedBlueprint::class, Serializer\DiscussionSerializer::class, ['alert', 'email'])
        ->type(Notifications\DiscussionRecipientRemovedBlueprint::class, Serializer\DiscussionSerializer::class, ['alert', 'email'])
        ->type(Notifications\DiscussionAddedBlueprint::class, Serializer\DiscussionSerializer::class, ['alert', 'email']),

    (new Extend\Event())
        ->listen(DiscussionSaving::class, Listeners\PersistRecipients::class)
        ->listen(DiscussionSaving::class, Listeners\DropTagsOnPrivateDiscussions::class)
        ->listen(PostSaving::class, Listeners\IgnoreApprovals::class)
        ->listen(UserSaving::class, Listeners\SaveUserPreferences::class)
        ->listen(DiscussionWasSplit::class, Listeners\AddRecipientsToSplitDiscussion::class),

    (new Extend\ServiceProvider())
        ->register(Provider\ByobuProvider::class),

    function (Dispatcher $events) {
        $events->subscribe(Listeners\CreatePostWhenRecipientsChanged::class);
        $events->subscribe(Listeners\QueueNotificationJobs::class);

        // Listeners for old-style events, will be removed in future betas
        $events->listen(GetModelIsPrivate::class, Listeners\GetModelIsPrivate::class);
        $events->listen(Searching::class, Listeners\UnifiedIndex::class);
        $events->subscribe(Listeners\AddGambits::class);
    },

    (new Extend\Settings())
        ->serializeToForum('byobu.icon-badge', 'fof-byobu.icon-badge', function ($value) {
            if ($value === null || $value === '') {
                $value = 'fas fa-map';
            }

            return $value;
        })
        ->serializeToForum('byobu.icon-postAction', 'fof-byobu.icon-postAction', function ($value) {
            if ($value === null || $value === '') {
                $value = 'far fa-map';
            }

            return $value;
        }),
];
