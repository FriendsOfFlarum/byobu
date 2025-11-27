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
use Flarum\Search\SearchState;
use Flarum\User\User;
use FoF\Byobu\Database\RecipientsConstraint;
use Flarum\Search\Filter\FilterInterface;

/**
 * Filters results to discussions that include the given user as recipient. Used to show private discussions on a user profile.
 */
class ByobuFilter implements FilterInterface
{
    use RecipientsConstraint;

    public function __construct(protected SlugManager $slugManager)
    {
    }

    public function filter(SearchState $state, array|string $value, bool $negate): void
    {
        $user = $this->slugManager->forResource(User::class)->fromSlug(trim($value[1], '"'), $state->getActor());

        $state->getQuery()->where(function ($query) use ($user) {
            $this->forRecipient($query, [], $user->id);
        });
    }
    public function getFilterKey(): string
    {
        return 'byobu';
    }
}
