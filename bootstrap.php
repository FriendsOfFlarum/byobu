<?php

namespace Flagrow\Messaging;

use Flarum\Foundation\Application;
use Illuminate\Contracts\Events\Dispatcher;

return function (Dispatcher $events, Application $app) {
    $events->subscribe(Listeners\AddClientAssets::class);
    $events->subscribe(Listeners\AddUploadsApi::class);

    $app->register(Providers\MessagingServiceProvider::class);
};
