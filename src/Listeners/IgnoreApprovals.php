<?php

namespace FoF\Byobu\Listeners;

use Flarum\Post\Event\Saving;
use FoF\Byobu\Concerns\ExtensionsDiscovery;
use FoF\Byobu\Discussion\Screener;

class IgnoreApprovals
{
    use ExtensionsDiscovery;

    public function handle(Saving $event)
    {
        /** @var Screener $screener */
        $screener = app('byobu.screener');
        $screener = $screener->fromDiscussion($event->post->discussion);

        if ($this->extensionIsEnabled('flarum-approval') && $screener->isPrivate()) {
            $event->post->is_approved = true;
        }
    }
}
