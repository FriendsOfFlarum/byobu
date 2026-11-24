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
use Flarum\Search\Filter\WindowFilterInterface;
use Flarum\Search\SearchState;

/**
 * @implements WindowFilterInterface<DatabaseSearchState>
 */
class WindowFilter implements WindowFilterInterface
{
    public function getFilterKey(): string
    {
        return 'window';
    }

    public function filter(SearchState $state, array|string $value, bool $negate): void
    {
    }
}
