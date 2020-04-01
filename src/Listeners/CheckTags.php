<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Listeners;

use Flarum\Discussion\Event\Saving;
use Flarum\Extension\ExtensionManager;
use Flarum\Foundation\ValidationException;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Tags\Tag;

class CheckTags
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @var ExtensionManager
     */
    protected $extensions;

    protected $byobuSlug;

    public function __construct(SettingsRepositoryInterface $settings, ExtensionManager $extensions)
    {
        $this->settings = $settings;
        $this->extensions = $extensions;

        $this->byobuSlug = $this->settings->get('fof-byobu.use_tag_slug');
    }

    public function handle(Saving $event)
    {
        if (
            $this->extensions->isEnabled('flarum-tags')
            && !empty($this->byobuSlug)
            && (isset($event->data['relationships']['recipientUsers']) || isset($event->data['relationships']['recipientGroups']))
        ) {
            if (isset($event->data['relationships']['tags']['data'])) {
                $tags = $event->data['relationships']['tags']['data'];

                foreach ($tags as $tag) {
                    $t = $this->getTagFromId($tag['id']);

                    if ($t->slug !== $this->byobuSlug) {
                        throw new ValidationException(['byobu' => 'Invalid tag for private discussions']);
                    }
                }
            }
        }
    }

    protected function getTagFromId(int $id): Tag
    {
        return Tag::where('id', $id)->first();
    }
}
