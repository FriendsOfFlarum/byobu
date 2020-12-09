<?php

namespace FoF\Byobu\Concerns;

use Flarum\Extension\ExtensionManager;

trait ExtensionsDiscovery
{
    /**
     * @param string $extension ; extension id (fof-byobu)
     * @return bool
     */
    public function extensionIsEnabled(string $extension): bool
    {
        /** @var ExtensionManager $manager */
        $manager = app(ExtensionManager::class);

        return $manager->isEnabled($extension);
    }
}
