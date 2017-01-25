<?php

namespace Flagrow\Byobu;

use Flarum\Foundation\Application;
use Illuminate\Contracts\Events\Dispatcher;

return function (Dispatcher $events, Application $app) {
    $events->subscribe(Listeners\AddClientAssets::class);
    $events->subscribe(Listeners\AddGambits::class);
    $events->subscribe(Listeners\AddMessagingApi::class);
    $events->subscribe(Listeners\AddRecipientsRelationships::class);
    $events->subscribe(Listeners\CreatePostWhenRecipientsChanged::class);
    $events->subscribe(Listeners\SaveRecipientsToDatabase::class);
};
