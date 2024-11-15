<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu;

use Flarum\Discussion\Discussion;
use Flarum\Discussion\Search\DiscussionSearcher;
use Flarum\Extend;
use Flarum\Group\Group;
use Flarum\Post\Event\Saving as PostSaving;
use Flarum\User\Event\Saving as UserSaving;
use Flarum\User\Search\UserSearcher;
use Flarum\User\User;
use FoF\Split\Events\DiscussionWasSplit;
use Flarum\Api\Context;
use Flarum\Api\Endpoint;
use Flarum\Api\Resource;
use Flarum\Api\Schema;
use Illuminate\Support\Arr;

return [
    (new Extend\Frontend('admin'))
        ->css(__DIR__.'/resources/less/admin.less')
        ->js(__DIR__.'/js/dist/admin.js'),

    (new Extend\Frontend('forum'))
        ->route('/private', 'byobuPrivate', Content\PrivateDiscussionsPage::class)
        ->route('/private/composer', 'byobuPrivateComposer')
        ->css(__DIR__.'/resources/less/forum/extension.less')
        ->js(__DIR__.'/js/dist/forum.js')
        ->jsDirectory(__DIR__ . '/js/dist/forum'),

    new Extend\Locales(__DIR__.'/resources/locale'),

    (new Extend\Model(Discussion::class))
        ->cast('isByobu', 'boolean')
        ->relationship('recipientUsers', function ($discussion) {
            return $discussion->belongsToMany(User::class, 'recipients')
                ->wherePivot('removed_at', null);
        })
        ->relationship('oldRecipientUsers', function ($discussion) {
            return $discussion->belongsToMany(User::class, 'recipients')
                ->wherePivot('removed_at', '!=', null);
        })
        ->relationship('recipientGroups', function ($discussion) {
            return $discussion->belongsToMany(Group::class, 'recipients')
                ->wherePivot('removed_at', null);
        })
        ->relationship('oldRecipientGroups', function ($discussion) {
            return $discussion->belongsToMany(Group::class, 'recipients')
                ->wherePivot('removed_at', '!=', null);
        }),

    (new Extend\Model(User::class))
        ->cast('blocks_byobu_pd', 'boolean')
        ->relationship('privateDiscussions', function ($user) {
            return $user->belongsToMany(Discussion::class, 'recipients')
                ->wherePivot('removed_at', null);
        }),

    (new Extend\Model(Group::class))
        ->relationship('privateDiscussions', function ($group) {
            return $group->belongsToMany(Discussion::class, 'recipients')
                ->wherePivot('removed_at', null);
        }),

    (new Extend\ApiResource(Resource\DiscussionResource::class))
        ->fieldsBefore('tags', Api\DiscussionResourceFields::class)
        ->field('tags', fn (Schema\Relationship\ToMany $field) => $field->writable(function (Discussion $discussion, Context $context) {
            return empty(Arr::get($context->body(), 'data.relationships.recipientUsers.data'))
                && empty(Arr::get($context->body(), 'data.relationships.recipientGroups.data'));
        }))
        ->endpoint([Endpoint\Show::class, Endpoint\Create::class, Endpoint\Index::class], function (Endpoint\Show|Endpoint\Create|Endpoint\Index $endpoint) {
            return $endpoint
                ->addDefaultInclude(['recipientUsers', 'recipientGroups'])
                ->eagerLoad(['recipientUsers', 'recipientGroups']);
        }),

    (new Extend\ApiResource(Resource\ForumResource::class))
        ->fields(Api\ForumResourceFields::class),

    (new Extend\ApiResource(Resource\UserResource::class))
        ->fields(fn () => [
            Schema\Boolean::make('blocksPd')
                ->property('blocks_byobu_pd')
                ->writable(fn (User $user, Context $context) => $context->getActor()->is($user)),
            Schema\Relationship\ToMany::make('privateDiscussions')
                ->type('discussions')
                ->visible(fn (User $user, Context $context) => $context->getActor()->is($user))
        ]),

    (new Extend\View())
        ->namespace('fof-byobu', __DIR__.'/resources/views'),

    (new Extend\Policy())
        ->modelPolicy(Discussion::class, Access\DiscussionPolicy::class),

    (new Extend\ModelVisibility(Discussion::class))
        ->scope(Access\ScopeDiscussionVisibility::class, 'viewPrivate'),

    (new Extend\Post())
        ->type(Posts\RecipientLeft::class)
        ->type(Posts\RecipientsModified::class)
        ->type(Posts\MadePublic::class),

    (new Extend\Notification())
        ->type(Notifications\DiscussionCreatedBlueprint::class, ['alert', 'email'])
        ->type(Notifications\DiscussionRepliedBlueprint::class, ['alert', 'email'])
        ->type(Notifications\DiscussionRecipientRemovedBlueprint::class, ['alert', 'email'])
        ->type(Notifications\DiscussionAddedBlueprint::class, ['alert', 'email'])
        ->type(Notifications\DiscussionMadePublicBlueprint::class, ['alert']),

    (new Extend\Event())
        ->listen(PostSaving::class, Listeners\IgnoreApprovals::class)
        ->listen(DiscussionWasSplit::class, Listeners\AddRecipientsToSplitDiscussion::class)
        ->subscribe(Listeners\CreatePostWhenRecipientsChanged::class)
        ->subscribe(Listeners\QueueNotificationJobs::class)
        ->subscribe(Listeners\AllRecipientsLeftHandler::class),

    (new Extend\ServiceProvider())
        ->register(Provider\ByobuProvider::class),

    (new Extend\ModelPrivate(Discussion::class))
        ->checker(Listeners\GetModelIsPrivate::class),

    (new Extend\Settings())
        // we have to use the callback here, else we risk returning empty values instead of the defaults.
        // see https://github.com/flarum/core/issues/3209
        ->serializeToForum('byobu.icon-badge', 'fof-byobu.icon-badge', function ($value): string {
            return empty($value) ? 'fas fa-map' : $value;
        })
        ->serializeToForum('byobu.icon-postAction', 'fof-byobu.icon-postAction', function ($value): string {
            return empty($value) ? 'far fa-map' : $value;
        })
        ->default('fof-byobu.delete_on_last_recipient_left', false),

    (new Extend\SearchDriver(\Flarum\Search\Database\DatabaseSearchDriver::class))
        ->addFilter(DiscussionSearcher::class, Filters\Discussion\ByobuFilter::class)
        ->addFilter(DiscussionSearcher::class, Filters\Discussion\PrivacyFilter::class)
        ->addMutator(DiscussionSearcher::class, Filters\Discussion\HidePrivateDiscussionsFromAllDiscussionsPage::class)
        ->addFilter(UserSearcher::class, Filters\User\AllowsPdFilter::class),
];
