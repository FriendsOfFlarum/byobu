<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Provider;

use Flarum\Foundation\AbstractServiceProvider;
use FoF\Byobu\Discussion\Screener;

class ByobuProvider extends AbstractServiceProvider
{
    public function register()
    {
        $this->container->bind('byobu.screener', Screener::class);
    }
}
