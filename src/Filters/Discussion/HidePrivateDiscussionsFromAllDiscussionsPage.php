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

use Flarum\Search\Database\DatabaseSearchState;
use Flarum\Search\SearchCriteria;
use Flarum\Settings\SettingsRepositoryInterface;

class HidePrivateDiscussionsFromAllDiscussionsPage
{
    public function __construct(protected SettingsRepositoryInterface $settings)
    {
    }

    public function __invoke(DatabaseSearchState $filter, SearchCriteria $queryCriteria): void
    {
        if (
            // Refine and window filters (a language, deck's activity check) keep it the same list.
            count($filter->getListFilters()) > 0 ||
            // If the user is logged out, they can't have private discussions anyway so we can skip the costly computations that follow
            $filter->getActor()->isGuest() ||
            // Finally, check if this feature is enabled
            !$this->settings->get('fof-byobu.hide_from_all_discussions_page')) {
            return;
        }

        // Use NOT EXISTS rather than LEFT JOIN + whereNull to avoid making bare column references
        // in other extensions' SELECT expressions ambiguous when MySQL resolves them across
        // multiple joined tables (e.g. flarum/sticky's is_unread_sticky expression). The
        // optimizer treats these patterns equivalently so there is no performance trade-off.
        $hidePrivate = function ($query) {
            $query->whereNotExists(function ($query) {
                $query->selectRaw('1')
                    ->from('recipients')
                    ->whereColumn('recipients.discussion_id', 'discussions.id')
                    ->whereNull('recipients.removed_at');
            });
        };

        $hidePrivate($filter->getQuery());

        // flarum/sticky's union is a copy of the query taken when its mutator ran,
        // which may be before this one, depending on extension boot order.
        foreach ($filter->getQuery()->getQuery()->unions ?? [] as $union) {
            $hidePrivate($union['query']);
        }
    }
}
