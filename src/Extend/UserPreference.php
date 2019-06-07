<?php

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
