<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Filters\User;

use Flarum\Extension\ExtensionManager;
use Flarum\Search\SearchState;
use FoF\Byobu\Events\SearchingRecipient;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Search\Filter\FilterInterface;

class AllowsPdFilter implements FilterInterface
{
    /**
     * @var Dispatcher
     */
    public $dispatcher;

    /**
     * @var ExtensionManager
     */
    public $manager;

    public function __construct(Dispatcher $dispatcher, ExtensionManager $manager)
    {
        $this->dispatcher = $dispatcher;
        $this->manager = $manager;
    }

    public function filter(SearchState $state, array|string $value, bool $negate): void
    {
        $actor = $state->getActor();

        $this->dispatcher->dispatch(new SearchingRecipient($state, $value, $negate));

        if ($actor->can('startPrivateDiscussionWithBlockers')) {
            return;
        }

        $state
            ->getQuery()
            // Always prevent PD's by non-privileged users to suspended users.
            ->when(
                $this->extensionEnabled('flarum-suspend') && !$negate,
                function ($query) {
                    $query->whereNull('suspended_until');
                }
            )
            // Always prevent PD's by non-privileged users to users that block PD's.
            ->where(function ($query) use ($negate) {
                $query->where('blocks_byobu_pd', $negate ? '1' : '0');
            })
            ->orderBy('username', 'asc');
    }

    protected function extensionEnabled(string $extension): bool
    {
        return $this->manager->isEnabled($extension);
    }
    public function getFilterKey(): string
    {
        return 'byobu';
    }
}
