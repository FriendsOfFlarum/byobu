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
use Illuminate\Support\Arr;

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
            && (Arr::exists($event->data, 'relationships.recipientUsers') || Arr::exists($event->data, 'relationships.recipientGroups'))
        ) {
            if (Arr::exists($event->data, 'relationships.tags.data')) {
                $tagIds = Arr::get($event->data, 'relationships.tags.data', []);

                /** @var $matches ; whether the tags assigned are either subtags or primary tags that we need to force onto the discussion */
                $matches = Tag::query()
                    ->whereIn('id', collect($tagIds)->pluck('id'))
                    ->where(function ($query) {
                        $query
                            ->where('slug', $this->byobuSlug)
                            ->orWhereHas('parent', function ($query) {
                                $query->where('slug', $this->byobuSlug);
                            });
                    })
                    ->count() === count($tagIds);

                if (!$matches) {
                    throw new ValidationException(['byobu' => 'Incorrect tags have been assigned to the private discussion']);
                }
            }
        }
    }
}
