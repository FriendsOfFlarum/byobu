<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Provider;

use Flarum\Api\Resource;
use Flarum\Discussion\Event\Saving;
use Flarum\Foundation\AbstractServiceProvider;
use FoF\Byobu\Discussion\Screener;
use FoF\Byobu\Listeners\DropTagsOnPrivateDiscussions;
use FoF\Byobu\Listeners\PersistRecipients;
use Illuminate\Events\Dispatcher;
use Illuminate\Support\Arr;

class ByobuProvider extends AbstractServiceProvider
{
    public function register(): void
    {
        $this->container->bind('byobu.screener', Screener::class);
    }

    public function boot(): void
    {
        // Registered at boot time (after all extension extenders have run) so that
        // flarum/tags has already added its 'tags' field to DiscussionResource.
        // Using ->field() in extend.php is too early — byobu loads before flarum/tags
        // alphabetically, so the tags field doesn't exist yet when the extender mutator runs.
        Resource\DiscussionResource::mutateFields(function (array $fields): array {
            foreach ($fields as $key => $field) {
                if ($field->name === 'tags') {
                    $fields[$key] = $field->writable(function ($discussion, $context) {
                        return empty(Arr::get($context->body(), 'data.relationships.recipientUsers.data'))
                            && empty(Arr::get($context->body(), 'data.relationships.recipientGroups.data'));
                    });
                    break;
                }
            }

            return $fields;
        });

        /** @var Dispatcher */
        $events = resolve(Dispatcher::class);

        // get the current listeners for the Discussion saving event
        $listeners = $events->getListeners(Saving::class);

        //remove current listeners
        $events->forget(Saving::class);

        // add byobu's persist recipients as the first listener, then add drop tags
        $events->listen(Saving::class, PersistRecipients::class);
        $events->listen(Saving::class, DropTagsOnPrivateDiscussions::class);

        // then re-add everything else
        // $listeners contains already-resolved closures from getListeners(), with signature
        // ($eventName, $payload). makeListener() will call our wrapper as $wrapper($eventObject),
        // so we restore the expected signature by hardcoding the event name string.
        foreach ($listeners as $listener) {
            $callable = function ($event) use ($listener) {
                return $listener(Saving::class, [$event]);
            };
            $events->listen(Saving::class, $callable);
        }
    }
}
