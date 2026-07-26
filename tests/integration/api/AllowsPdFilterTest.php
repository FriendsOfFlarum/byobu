<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Tests\integration\api;

use Flarum\Group\Group;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use PHPUnit\Framework\Attributes\Test;

/**
 * Covers {@see \FoF\Byobu\Filters\User\AllowsPdFilter}, the user searcher
 * filter behind the recipient picker.
 *
 * The filter hides users who have opted out of private discussions
 * (blocks_byobu_pd), unless the actor holds
 * discussion.startPrivateDiscussionWithBlockers.
 *
 * Fixtures:
 *   1 admin, 2 normal, 3 alice, 4 blocker (blocks_byobu_pd = 1)
 */
class AllowsPdFilterTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('fof-byobu');

        $this->prepareDatabase([
            User::class => [
                $this->normalUser(),
                ['id' => 3, 'username' => 'alice',   'email' => 'alice@example.com',   'password' => 'too-obscure', 'is_email_confirmed' => 1],
                ['id' => 4, 'username' => 'blocker', 'email' => 'blocker@example.com', 'password' => 'too-obscure', 'is_email_confirmed' => 1, 'blocks_byobu_pd' => 1],
            ],
        ]);
    }

    protected function grantPermission(string $permission, int $groupId = Group::MEMBER_ID): void
    {
        $this->prepareDatabase([
            'group_permission' => [
                ['group_id' => $groupId, 'permission' => $permission],
            ],
        ]);
    }

    /**
     * GET /api/users with the given filter, returning matched usernames.
     */
    protected function filterUsernames(array $filter, ?int $actorId = null): array
    {
        $response = $this->send(
            $this->request('GET', '/api/users', array_filter([
                'authenticatedAs' => $actorId,
            ]))->withQueryParams(['filter' => $filter])
        );

        $this->assertEquals(200, $response->getStatusCode(), 'User search request failed');

        $body = json_decode($response->getBody()->getContents(), true);

        return array_map(
            fn ($user) => $user['attributes']['username'],
            $body['data'] ?? []
        );
    }

    #[Test]
    public function filterHidesUsersWhoBlockPrivateDiscussions()
    {
        $usernames = $this->filterUsernames(['allows-pd' => 'true'], 2);

        $this->assertContains('alice', $usernames);
        $this->assertNotContains('blocker', $usernames, 'Users who block PDs must be filtered out');
    }

    #[Test]
    public function filterIsBypassedForActorsAllowedToMessageBlockers()
    {
        $this->grantPermission('discussion.startPrivateDiscussionWithBlockers');

        $usernames = $this->filterUsernames(['allows-pd' => 'true'], 2);

        $this->assertContains('blocker', $usernames, 'Privileged actors may see blocking users');
    }

    #[Test]
    public function negatedFilterReturnsOnlyBlockingUsers()
    {
        $usernames = $this->filterUsernames(['-allows-pd' => 'true'], 2);

        $this->assertContains('blocker', $usernames);
        $this->assertNotContains('alice', $usernames);
    }

    #[Test]
    public function unfilteredUserSearchStillIncludesBlockingUsers()
    {
        // Without the filter the opt-out must not apply — it is scoped to the
        // recipient picker, not to user search in general.
        $usernames = $this->filterUsernames([], 2);

        $this->assertContains('alice', $usernames);
        $this->assertContains('blocker', $usernames);
    }
}
