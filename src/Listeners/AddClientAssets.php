<?php

namespace Flagrow\Byobu\Listeners;

use DirectoryIterator;
use Flarum\Event\ConfigureLocales;
use Flarum\Frontend\Event\Rendering;
use Illuminate\Contracts\Events\Dispatcher;

class AddClientAssets
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(Rendering::class, [$this, 'addAssets']);
        $events->listen(ConfigureLocales::class, [$this, 'addLocales']);
    }

    /**
     * @param Rendering $app
     */
    public function addAssets(Rendering $app)
    {
        if ($app->isForum()) {
            $app->addAssets([
                __DIR__.'/../../js/forum/dist/extension.js',
                __DIR__.'/../../less/forum/extension.less'
            ]);
            $app->addBootstrapper('flagrow/byobu/main');
        }

        if ($app->isAdmin()) {
            $app->addAssets([
                __DIR__ . '/../../js/admin/dist/extension.js'
            ]);
            $app->addBootstrapper('flagrow/byobu/main');
        }
    }

    /**
     * Provides i18n files.
     *
     * @param ConfigureLocales $event
     */
    public function addLocales(ConfigureLocales $event)
    {
        foreach (new DirectoryIterator(__DIR__ . '/../../locale') as $file) {
            if ($file->isFile() && in_array($file->getExtension(), ['yml', 'yaml'])) {
                $event->locales->addTranslations($file->getBasename('.' . $file->getExtension()), $file->getPathname());
            }
        }
    }
}
