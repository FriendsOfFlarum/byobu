<?php

namespace Flagrow\Messaging;

use Flarum\Foundation\Application;
use Illuminate\Contracts\Events\Dispatcher;

return function (Dispatcher $events, Application $app) {
    $events->subscribe(Listeners\AddMessagingApi::class);
    $events->subscribe(Listeners\AddGambits::class);
    $events->subscribe(Listeners\AddRecipientsRelationships::class);
};
