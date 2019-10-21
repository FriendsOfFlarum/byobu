<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Providers;

use Flarum\Foundation\AbstractServiceProvider;

class ViewProvider extends AbstractServiceProvider
{
    public function register()
    {
        $this->loadViewsFrom(
            __DIR__.'/../../assets/views',
            'byobu'
        );
    }
}
