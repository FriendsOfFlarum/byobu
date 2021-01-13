<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) 2019 - 2021 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Concerns;

use Flarum\Extension\ExtensionManager;

trait ExtensionsDiscovery
{
    /**
     * @param string $extension ; extension id (fof-byobu)
     *
     * @return bool
     */
    public function extensionIsEnabled(string $extension): bool
    {
        /** @var ExtensionManager $manager */
        $manager = app(ExtensionManager::class);

        return $manager->isEnabled($extension);
    }
}
