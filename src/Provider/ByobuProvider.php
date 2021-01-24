<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) 2019 - 2021 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Provider;

use Flarum\Flags\Flag;
use Flarum\Foundation\AbstractServiceProvider;
use FoF\Byobu\Discussion\Screener;
use FoF\Byobu\Observer\FlagObserver;

class ByobuProvider extends AbstractServiceProvider
{
    public function boot()
    {
        // Temporary implementation pending https://github.com/flarum/flags/pull/35
        Flag::observe(new FlagObserver());
    }

    public function register()
    {
        $this->app->bind('byobu.screener', Screener::class);
    }
}
