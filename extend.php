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
use Flarum\Discussion\Event\Saving;
use Flarum\Event\ConfigureNotificationTypes;
use Flarum\Extend as Native;
use FoF\Components\Extend\AddFofComponents;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Contracts\View\Factory;

return [
    new AddFofComponents(),
    (new Native\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),
    (new Native\Frontend('forum'))
        ->css(__DIR__.'/resources/less/forum/extension.less')
        ->js(__DIR__.'/js/dist/forum.js')
        ->content(Content\PassExtensionSettings::class),
    new Native\Locales(__DIR__.'/resources/locale'),
    new Extend\UserPreference('blocksPd', function ($value) {
        return boolval($value);
    }, false),
    (new Extend\ApiAttribute())
        ->add(ForumSerializer::class, Api\PermissionAttributes::class)
        ->add(DiscussionSerializer::class, Api\PermissionAttributes::class)
        ->add(BasicUserSerializer::class, Api\UserAttributes::class),
    new Native\Compat(function (Dispatcher $events) {
        $events->subscribe(Listeners\AddGambits::class);
        $events->subscribe(Listeners\AddRecipientsRelationships::class);
        $events->subscribe(Listeners\CreatePostWhenRecipientsChanged::class);
        $events->subscribe(Listeners\SaveRecipientsToDatabase::class);
        $events->subscribe(Listeners\SaveBlocksPdPreference::class);
        $events->subscribe(Listeners\AddApiAttributes::class);
        $events->listen(Saving::class, Listeners\CheckTags::class);

        $events->subscribe(Listeners\QueueNotificationJobs::class);

        $events->subscribe(Access\DiscussionPolicy::class);

        // Support for fof/split
        $events->subscribe(Listeners\AddRecipientsToSplitDiscussion::class);

        // Add notifications
        $events->listen(ConfigureNotificationTypes::class, function (ConfigureNotificationTypes $event) {
            $event->add(Notifications\DiscussionCreatedBlueprint::class, DiscussionSerializer::class, ['alert', 'email']);
            $event->add(Notifications\DiscussionRepliedBlueprint::class, DiscussionSerializer::class, ['alert', 'email']);
            $event->add(Notifications\DiscussionRecipientRemovedBlueprint::class, DiscussionSerializer::class, ['alert', 'email']);
            $event->add(Notifications\DiscussionAddedBlueprint::class, DiscussionSerializer::class, ['alert', 'email']);
        });
    }),
    function (Factory $views) {
        $views->addNamespace('fof-byobu', __DIR__.'/resources/views');
    },
];
