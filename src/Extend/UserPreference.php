<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Extend;

use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use Flarum\User\User;
use Illuminate\Contracts\Container\Container;

class UserPreference implements ExtenderInterface
{
    /**
     * @var string
     */
    private $key;
    /**
     * @var callable|null
     */
    private $callable;
    /**
     * @var null|mixed
     */
    private $default;

    public function __construct(string $key, callable $callable = null, $default = null)
    {
        $this->key = $key;
        $this->callable = $callable;
        $this->default = $default;
    }

    public function extend(Container $container, Extension $extension = null)
    {
        User::addPreference($this->key, $this->callable, $this->default);
    }
}
