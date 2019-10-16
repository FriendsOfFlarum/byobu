<?php

namespace FoF\Byobu;

use Flarum\Api\Serializer\BasicUserSerializer;
use Flarum\Api\Serializer\DiscussionSerializer;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Extend as Native;
use Illuminate\Contracts\Events\Dispatcher;

return [
    (new Native\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),
    (new Native\Frontend('forum'))
        ->css(__DIR__.'/resources/less/forum/extension.less')
        ->js(__DIR__.'/js/dist/forum.js')
        ->content(Content\PassExtensionSettings::class),
    new Native\Locales(__DIR__.'/resources/locale'),
    new Extend\UserPreference('blocksPd', function ($value) { return boolval($value); }, false),
    (new Extend\ApiAttribute)
        ->add(ForumSerializer::class, Api\PermissionAttributes::class)
        ->add(DiscussionSerializer::class, Api\PermissionAttributes::class)
        ->add(BasicUserSerializer::class, Api\UserAttributes::class),
    new Native\Compat(function (Dispatcher $events) {
        $events->subscribe(Listeners\AddGambits::class);
        $events->subscribe(Listeners\AddRecipientsRelationships::class);
        $events->subscribe(Listeners\CreatePostWhenRecipientsChanged::class);
        $events->subscribe(Listeners\SaveRecipientsToDatabase::class);
        $events->subscribe(Listeners\SaveBlocksPdPreference::class);

        $events->subscribe(Access\DiscussionPolicy::class);

        // Support for fof/split
        $events->subscribe(Listeners\AddRecipientsToSplitDiscussion::class);
    }),
];
