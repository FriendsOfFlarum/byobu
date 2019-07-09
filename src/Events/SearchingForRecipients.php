<?php

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