<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Tests\integration;

use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Testing\integration\TestCase;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;

class SettingsDefaultsTest extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();

        $this->extension('fof-byobu');
    }

    #[Test]
    #[DataProvider('defaults')]
    public function setting_has_a_default_before_the_admin_saves_it(string $key, mixed $default): void
    {
        $settings = $this->app()->getContainer()->make(SettingsRepositoryInterface::class);

        $this->assertSame($default, $settings->get($key));
    }

    public static function defaults(): array
    {
        return [
            ['fof-byobu.delete_on_last_recipient_left', false],
            ['fof-byobu.makePublic', false],
            ['fof-byobu.hide_from_all_discussions_page', false],
            ['fof-byobu.icon-badge', 'far fa-map'],
            ['fof-byobu.icon-postAction', 'far fa-map'],
        ];
    }
}
