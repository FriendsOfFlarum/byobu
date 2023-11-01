<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Events;

use Flarum\Search\SearchState;

class SearchingRecipient
{
    public function __construct(public SearchState $search, public array $matches, public bool $negate)
    {
    }
}
