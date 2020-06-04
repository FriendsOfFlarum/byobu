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
use FoF\Byobu\TagPlus;
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
                $tags = Arr::get($event->data, 'relationships.tags.data');

                $allowedParentTagId = [];
                $tagIdsProcessed = [];

                foreach ($tags as $tag) {
                    $t = $this->getTagFromId($tag['id']);

                    // Prepare for fancy primary + secondary tag interoperability!
                    $tParent = null;
                    $tParentId = null;

                    // If the tag we're looking at right now is a secondary...
                    if (null !== $t->parentId()) {
                        $tParentId = $t->parentId();
                        // Set its parent (primary) to the $tParent variable
                        $tParent = $this->getTagFromId($tParentId);
                    }

                    // If this tag's slug doesn't match the forced tag for PDs...
                    if ($t->slug !== $this->byobuSlug) {
                        // ...but this tag matches the allowed primary tag
                        if (!empty($allowedParentTagId) && in_array($tag['id'], $allowedParentTagId, true)) {
                            // It's all good in the hood!
                        } else {
                            // Tell ourselves that we've checked the tag with this ID
                            // And it was validated to be INVALID
                            $tagIdsProcessed += [($tag['id']) => false];
                            continue;
                        }
                    } else {
                        // If this allowed tag is a secondary tag...
                        if (isset($tParentId)) {
                            // Tell ourselves that we're allowed the primary too!
                            array_push($allowedParentTagId, $tParentId);

                            // If we've already processed the primary tag earlier, set it to be valid
                            if (array_key_exists($tParentId, $tagIdsProcessed)) {
                                $tagIdsProcessed[$tParentId] = true;
                                continue;
                            }
                        }
                    }

                    // Tell ourselves that we've checked the tag with this ID
                    // And it was validated to be valid
                    $tagIdsProcessed += [($tag['id']) => true];
                }

                if (in_array(false, $tagIdsProcessed, true)) {
                    // A tag on the post was found to be invalid!
                    throw new ValidationException(['byobu' => 'Invalid tags for private discussions']);
                }
            }
        }
    }

    protected function getTagFromId(int $id): TagPlus
    {
        return TagPlus::where('id', $id)->first();
    }
}
