<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Events;

use Flarum\Search\AbstractSearch;

class SearchingForRecipients
{
    /**
     * @var AbstractSearch
     */
    public $search;

    /**
     * @var array
     */
    public $matches;

    /**
     * @var bool
     */
    public $negate;

    public function __construct(AbstractSearch $search, array $matches, $negate)
    {
        $this->search = $search;
        $this->matches = $matches;
        $this->negate = $negate;
    }
}
