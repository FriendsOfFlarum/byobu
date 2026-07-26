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
use Flarum\User\UserRepository;
use FoF\Byobu\Database\RecipientsConstraint;

/**
 * Filters results to discussions that include the given user as recipient. Used to show private discussions on a user profile.
 *
 * @implements FilterInterface<DatabaseSearchState>
 */
class ByobuFilter implements FilterInterface
{
    use RecipientsConstraint;

    public function __construct(protected SlugManager $slugManager, protected UserRepository $users)
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

        $user = $this->resolveUser($username, $state->getActor());

        if ($user === null) {
            // If the user doesn't exist, return no results by adding an impossible condition
            $state->getQuery()->whereRaw('1 = 0');

            return;
        }

        $state->getQuery()->where(function ($query) use ($user) {
            $this->forRecipient($query, [], $user->id);
        });
    }

    /**
     * Resolve the gambit value to a user.
     *
     * Three lookups are needed, because what a person types is whatever the
     * forum shows them, which depends on configuration:
     *
     *  1. The slug driver. Under the default utf8_username driver a username
     *     *is* the slug, but id_with_display_name expects "133-karaok" and a
     *     third-party driver may produce any shape at all.
     *  2. The username, for when the slug driver doesn't accept a bare one.
     *  3. The nickname, when a display-name driver backed by that column is in
     *     use (flarum/nicknames), since the nickname is what the UI displays
     *     and therefore what gets typed.
     *
     * Display names themselves can't be matched directly: DriverInterface only
     * maps user -> string, with no reverse lookup, and drivers may transform
     * the value (the nickname driver strips brackets and inserts zero-width
     * spaces), so a computed display name need not equal any stored column.
     */
    protected function resolveUser(string $username, User $actor): ?User
    {
        try {
            return $this->slugManager->forResource(User::class)->fromSlug($username, $actor);
        } catch (\Throwable) {
            // Not a valid slug for the configured driver; fall through.
        }

        $id = $this->users->getIdForUsername($username, $actor);

        if ($id !== null) {
            return $this->users->query()->find($id);
        }

        // Only when a nickname column is actually present, so this keeps working
        // whether or not flarum/nicknames is installed.
        $query = $this->users->query();

        if ($query->getConnection()->getSchemaBuilder()->hasColumn('users', 'nickname')) {
            return $query->where('nickname', $username)->first();
        }

        return null;
    }

    public function getFilterKey(): string
    {
        return 'byobu';
    }
}
