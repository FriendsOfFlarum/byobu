<?php

namespace Flagrow\Byobu;

use Flarum\Extend;
use Illuminate\Contracts\Events\Dispatcher;

return [
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),
    (new Extend\Frontend('forum'))
        ->css(__DIR__.'/resources/less/forum/extension.less')
        ->js(__DIR__.'/js/dist/forum.js'),
    new Extend\Locales(__DIR__.'/resources/locale'),
    new Extend\Compat(function (Dispatcher $events) {
        $events->subscribe(Listeners\AddGambits::class);
        $events->subscribe(Listeners\AddRecipientsRelationships::class);
        $events->subscribe(Listeners\AddPermissions::class);
        $events->subscribe(Listeners\CreatePostWhenRecipientsChanged::class);
        $events->subscribe(Listeners\SaveRecipientsToDatabase::class);

        $events->subscribe(Access\DiscussionPolicy::class);

        // Support for flagrow/split
        $events->subscribe(Listeners\AddRecipientsToSplitDiscussion::class);
    }),
];
