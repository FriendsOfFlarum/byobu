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
use Flarum\User\IdWithDisplayNameSlugDriver;
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
     *  1. The username, which is what the gambit documents and what the default
     *     utf8_username slug driver would resolve anyway.
     *  2. The nickname, when a display-name driver backed by that column is in
     *     use (flarum/nicknames), since the nickname is what the UI displays
     *     and therefore what gets typed.
     *  3. The slug driver, for an actual slug such as "133-karaok" under
     *     id_with_display_name, or whatever shape a third-party driver uses.
     *
     * The column lookups deliberately come first, and IdWithDisplayNameSlugDriver
     * is skipped for non-numeric values. That driver passes the leading segment
     * straight to findOrFail(), so on PostgreSQL a bare name is compared against
     * the integer id column, which raises — and inside a transaction it poisons
     * every later statement. MySQL and SQLite silently coerce, so the difference
     * is invisible there.
     *
     * Display names themselves can't be matched directly: DriverInterface only
     * maps user -> string, with no reverse lookup, and drivers may transform
     * the value (the nickname driver strips brackets and inserts zero-width
     * spaces), so a computed display name need not equal any stored column.
     */
    protected function resolveUser(string $username, User $actor): ?User
    {
        $id = $this->users->getIdForUsername($username, $actor);

        if ($id !== null) {
            return $this->users->query()->find($id);
        }

        // Only when a nickname column is actually present, so this keeps working
        // whether or not flarum/nicknames is installed.
        if ($this->users->query()->getConnection()->getSchemaBuilder()->hasColumn('users', 'nickname')) {
            $user = $this->users->query()->where('nickname', $username)->first();

            if ($user !== null) {
                return $user;
            }
        }

        $driver = $this->slugManager->forResource(User::class);

        // IdWithDisplayNameSlugDriver treats the leading segment as an id, so a
        // non-numeric value would be compared against the integer id column.
        // Skip it rather than let the driver issue a query that errors.
        if ($driver instanceof IdWithDisplayNameSlugDriver && !preg_match('/^\d+(-|$)/', $username)) {
            return null;
        }

        try {
            return $driver->fromSlug($username, $actor);
        } catch (\Throwable) {
            return null;
        }
    }

    public function getFilterKey(): string
    {
        return 'byobu';
    }
}
