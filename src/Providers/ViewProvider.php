<?php
namespace FoF\Byobu\Providers;
use Flarum\Foundation\AbstractServiceProvider;
class ViewProvider extends AbstractServiceProvider
{
    public function register()
    {
        $this->loadViewsFrom(
            __DIR__ . '/../../assets/views',
            'byobu'
        );
    }
}