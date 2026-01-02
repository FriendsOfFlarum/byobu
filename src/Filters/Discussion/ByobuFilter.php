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

use Flarum\Http\SlugManager;
use Flarum\Search\Database\DatabaseSearchState;
use Flarum\Search\Filter\FilterInterface;
use Flarum\Search\SearchState;
use Flarum\User\User;
use FoF\Byobu\Database\RecipientsConstraint;

/**
 * Filters results to discussions that include the given user as recipient. Used to show private discussions on a user profile.
 *
 * @implements FilterInterface<DatabaseSearchState>
 */
class ByobuFilter implements FilterInterface
{
    use RecipientsConstraint;

    public function __construct(protected SlugManager $slugManager)
    {
    }

    public function filter(SearchState $state, array|string $value, bool $negate): void
    {
        // Handle both array and string formats
        // If array: ['byobu', 'username'] -> use $value[1]
        // If string: 'username' -> use $value directly
        $username = is_array($value) ? trim($value[1] ?? $value[0] ?? '', '"') : trim($value, '"');

        if (empty($username)) {
            $state->getQuery()->whereRaw('1 = 0');
            return;
        }

        try {
            $user = $this->slugManager->forResource(User::class)->fromSlug($username, $state->getActor());
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // If the user doesn't exist, return no results by adding an impossible condition
            $state->getQuery()->whereRaw('1 = 0');
            return;
        }

        $state->getQuery()->where(function ($query) use ($user) {
            $this->forRecipient($query, [], $user->id);
        });
    }

    public function getFilterKey(): string
    {
        return 'byobu';
    }
}
