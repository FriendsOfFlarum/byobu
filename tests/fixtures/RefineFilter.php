<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Tests\fixtures;

use Flarum\Search\Database\DatabaseSearchState;
use Flarum\Search\Filter\RefineFilterInterface;
use Flarum\Search\SearchState;

/**
 * @implements RefineFilterInterface<DatabaseSearchState>
 */
class RefineFilter implements RefineFilterInterface
{
    public function getFilterKey(): string
    {
        return 'refine';
    }

    public function filter(SearchState $state, array|string $value, bool $negate): void
    {
    }
}
