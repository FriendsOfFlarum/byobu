<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Filters\Discussion;

use Flarum\Filter\FilterState;
use Flarum\Query\QueryCriteria;
use Flarum\Settings\SettingsRepositoryInterface;

class HidePrivateDiscussionsFromAllDiscussionsPage
{
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function __invoke(FilterState $filter, QueryCriteria $queryCriteria)
    {
        if (
            // If there are filters applied, we are no longer on "all discussions" page and don't want to restrict
            count($filter->getActiveFilters()) > 0 ||
            // If the user is logged out, they can't have private discussions anyway so we can skip the costly computations that follow
            $filter->getActor()->isGuest() ||
            // Finally, check if this feature is enabled
            !$this->settings->get('fof-byobu.hide_from_all_discussions_page')) {
            return;
        }

        // Use a JOIN instead of a subquery because we don't want to extract the list of all PD IDs from the entire forum
        // Use an alias for the recipients table to avoir errors with other features or extension that might also join the table
        $filter->getQuery()
            ->leftJoin('recipients as adp_recipients', 'adp_recipients.discussion_id', '=', 'discussions.id')
            ->whereNull('adp_recipients.discussion_id');
    }
}
