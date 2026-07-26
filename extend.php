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

use Flarum\Api\Context;
use Flarum\Api\Endpoint;
use Flarum\Api\Resource;
use Flarum\Api\Schema;
use Flarum\Discussion\Discussion;
use Flarum\Discussion\Search\DiscussionSearcher;
use Flarum\Extend;
use Flarum\Group\Group;
use Flarum\Post\Event\Saving as PostSaving;
use Flarum\User\Event\Saving as UserSaving;
use Flarum\User\Search\UserSearcher;
use Flarum\User\User;
use FoF\Split\Events\DiscussionWasSplit;
use Illuminate\Support\Arr;

return [
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),

    (new Extend\Frontend('forum'))
        ->route('/private', 'byobuPrivate', Content\PrivateDiscussionsPage::class)
        ->route('/private/composer', 'byobuPrivateComposer')
        ->css(__DIR__.'/resources/less/forum/extension.less')
        ->js(__DIR__.'/js/dist/forum.js')
        ->jsDirectory(__DIR__.'/js/dist/forum'),

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
        ->fields(Api\DiscussionResourceFields::class)
        ->endpoint([Endpoint\Show::class, Endpoint\Create::class, Endpoint\Index::class], function (Endpoint\Show|Endpoint\Create|Endpoint\Index $endpoint) {
            return $endpoint
                ->addDefaultInclude(['recipientUsers', 'recipientGroups'])
                ->eagerLoad(['recipientUsers', 'recipientGroups']);
        })
        ->endpoint(Endpoint\Create::class, function (Endpoint\Create $endpoint) {
            // Strip the tags relationship from the request body before field validation runs,
            // when the request includes byobu recipient relationships. This prevents
            // flarum/tags from requiring a tag on private discussion creation, and avoids
            // a 403 from assertFieldsWritable (tags is made non-writable for byobu requests,
            // so sending tags in the payload would be rejected).
            return $endpoint->before(function (Context $context) {
                $parsedBody = $context->request->getParsedBody();

                $hasRecipients = !empty(Arr::get($parsedBody, 'data.relationships.recipientUsers.data'))
                    || !empty(Arr::get($parsedBody, 'data.relationships.recipientGroups.data'));

                if ($hasRecipients && isset($parsedBody['data']['relationships']['tags'])) {
                    unset($parsedBody['data']['relationships']['tags']);
                    $context->request = $context->request->withParsedBody($parsedBody);
                }
            });
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
                ->visible(fn (User $user, Context $context) => $context->getActor()->is($user)),
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
        ->listen(UserSaving::class, Listeners\SaveUserPreferences::class)
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
            return empty($value) ? 'far fa-map' : $value;
        })
        ->serializeToForum('byobu.icon-postAction', 'fof-byobu.icon-postAction', function ($value): string {
            return empty($value) ? 'far fa-map' : $value;
        })
        ->default('fof-byobu.delete_on_last_recipient_left', false),

    (new Extend\Middleware('forum'))
        ->add(Middleware\GuestAccessToPrivateRoutePrevention::class),

    (new Extend\SearchDriver(\Flarum\Search\Database\DatabaseSearchDriver::class))
        ->addFilter(DiscussionSearcher::class, Filters\Discussion\ByobuFilter::class)
        ->addFilter(DiscussionSearcher::class, Filters\Discussion\PrivacyFilter::class)
        ->addMutator(DiscussionSearcher::class, Filters\Discussion\HidePrivateDiscussionsFromAllDiscussionsPage::class)
        ->addFilter(UserSearcher::class, Filters\User\AllowsPdFilter::class),
];
