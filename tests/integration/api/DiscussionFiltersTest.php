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

use Carbon\Carbon;
use Flarum\Discussion\Discussion;
use Flarum\Group\Group;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use PHPUnit\Framework\Attributes\Test;

/**
 * Covers the two discussion searcher filters:
 *
 *  - filter[byobu]=<username>  {@see \FoF\Byobu\Filters\Discussion\ByobuFilter}
 *  - filter[private]=true      {@see \FoF\Byobu\Filters\Discussion\PrivacyFilter}
 *
 * These are addressed by filter key rather than by gambit string. Gambit
 * parsing ("byobu:bob") happens client-side in the JS IGambit classes, which
 * translate to the filter keys before the request is made — filter[q] never
 * sees gambit syntax on the server.
 *
 * Fixtures:
 *   1 admin, 2 normal, 3 alice, 4 bob, 5 outsider
 *   Staff group (10) contains alice and bob.
 *
 *   Discussion 1 "Public one"    — not private, no recipients
 *   Discussion 2 "Alice and Bob" — private, recipient users alice + bob
 *   Discussion 3 "Staff only"    — private, recipient group Staff
 *   Discussion 4 "Alice left"    — private, alice's recipient row is soft-removed
 */
class DiscussionFiltersTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('fof-byobu');

        $now = Carbon::now();

        $this->prepareDatabase([
            User::class => [
                $this->normalUser(),
                ['id' => 3, 'username' => 'alice',    'email' => 'alice@example.com',    'password' => 'too-obscure', 'is_email_confirmed' => 1],
                ['id' => 4, 'username' => 'bob',      'email' => 'bob@example.com',      'password' => 'too-obscure', 'is_email_confirmed' => 1],
                ['id' => 5, 'username' => 'outsider', 'email' => 'outsider@example.com', 'password' => 'too-obscure', 'is_email_confirmed' => 1],
            ],
            Group::class => [
                ['id' => 10, 'name_singular' => 'Staff', 'name_plural' => 'Staff', 'color' => null, 'icon' => null, 'is_hidden' => 0],
            ],
            'group_user' => [
                ['user_id' => 3, 'group_id' => 10],
                ['user_id' => 4, 'group_id' => 10],
            ],
            Discussion::class => [
                ['id' => 1, 'title' => 'Public one',    'user_id' => 5, 'created_at' => $now, 'is_private' => 0, 'comment_count' => 1],
                ['id' => 2, 'title' => 'Alice and Bob', 'user_id' => 3, 'created_at' => $now, 'is_private' => 1, 'comment_count' => 1],
                ['id' => 3, 'title' => 'Staff only',    'user_id' => 3, 'created_at' => $now, 'is_private' => 1, 'comment_count' => 1],
                ['id' => 4, 'title' => 'Alice left',    'user_id' => 4, 'created_at' => $now, 'is_private' => 1, 'comment_count' => 1],
            ],
            'recipients' => [
                ['discussion_id' => 2, 'user_id' => 3, 'group_id' => null, 'removed_at' => null, 'created_at' => $now, 'updated_at' => $now],
                ['discussion_id' => 2, 'user_id' => 4, 'group_id' => null, 'removed_at' => null, 'created_at' => $now, 'updated_at' => $now],
                ['discussion_id' => 3, 'user_id' => null, 'group_id' => 10, 'removed_at' => null, 'created_at' => $now, 'updated_at' => $now],
                // Alice was removed from discussion 4; bob remains.
                ['discussion_id' => 4, 'user_id' => 3, 'group_id' => null, 'removed_at' => $now, 'created_at' => $now, 'updated_at' => $now],
                ['discussion_id' => 4, 'user_id' => 4, 'group_id' => null, 'removed_at' => null, 'created_at' => $now, 'updated_at' => $now],
            ],
        ]);
    }

    /**
     * GET /api/discussions with the given filter, returning matched ids.
     */
    protected function filterIds(array $filter, ?int $actorId = null): array
    {
        $response = $this->send(
            $this->request('GET', '/api/discussions', array_filter([
                'authenticatedAs' => $actorId,
            ]))->withQueryParams(['filter' => $filter])
        );

        $this->assertEquals(200, $response->getStatusCode(), 'Search request failed');

        $body = json_decode($response->getBody()->getContents(), true);

        return array_map(fn ($discussion) => (int) $discussion['id'], $body['data'] ?? []);
    }

    // -------------------------------------------------------------------------
    // ByobuFilter — filter[byobu]
    // -------------------------------------------------------------------------

    #[Test]
    public function byobuFilterReturnsDiscussionsWhereUserIsADirectRecipient()
    {
        $ids = $this->filterIds(['byobu' => 'bob'], 4);

        $this->assertContains(2, $ids);
        $this->assertContains(4, $ids);
        $this->assertNotContains(1, $ids, 'Public discussion must not match a recipient filter');
    }

    #[Test]
    public function byobuFilterExcludesSoftRemovedRecipients()
    {
        $ids = $this->filterIds(['byobu' => 'alice'], 3);

        $this->assertContains(2, $ids, 'Alice is still a recipient on discussion 2');
        $this->assertNotContains(4, $ids, 'Alice was removed from discussion 4 and must not match');
    }

    #[Test]
    public function byobuFilterMatchesOnlyDirectUserRowsNotGroupMembership()
    {
        // Discussion 3 is addressed to the Staff group, which bob belongs to,
        // but ByobuFilter::forRecipient() is called with an empty group list.
        $ids = $this->filterIds(['byobu' => 'bob'], 4);

        $this->assertNotContains(3, $ids, 'Group-addressed discussions are not matched by the byobu filter');
    }

    #[Test]
    public function byobuFilterWithUnknownUsernameReturnsNoResults()
    {
        $this->assertSame([], $this->filterIds(['byobu' => 'nobodyhere'], 3));
    }

    #[Test]
    public function byobuFilterWithEmptyValueReturnsNoResults()
    {
        $this->assertSame([], $this->filterIds(['byobu' => ''], 3));
    }

    #[Test]
    public function byobuFilterDoesNotLeakDiscussionsTheActorCannotSee()
    {
        // Outsider receives none of the private discussions. Filtering by bob's
        // username must not expose bob's private discussions to them.
        $ids = $this->filterIds(['byobu' => 'bob'], 5);

        $this->assertNotContains(2, $ids);
        $this->assertNotContains(4, $ids);
    }

    // -------------------------------------------------------------------------
    // PrivacyFilter — filter[private]
    // -------------------------------------------------------------------------

    #[Test]
    public function privateFilterReturnsOnlyDiscussionsTheActorReceives()
    {
        $ids = $this->filterIds(['private' => 'true'], 3);

        $this->assertContains(2, $ids);
        $this->assertContains(3, $ids, 'Group recipients must match via the actor groups');
        $this->assertNotContains(4, $ids, 'Removed recipient must not match');
        $this->assertNotContains(1, $ids, 'Public discussion is not private');
    }

    #[Test]
    public function privateFilterMatchesGroupRecipients()
    {
        $ids = $this->filterIds(['private' => 'true'], 4);

        $this->assertContains(3, $ids, 'Bob is in Staff, which receives discussion 3');
    }

    #[Test]
    public function privateFilterReturnsNothingForAUserWithNoPrivateDiscussions()
    {
        $ids = $this->filterIds(['private' => 'true'], 5);

        $this->assertNotContains(2, $ids);
        $this->assertNotContains(3, $ids);
        $this->assertNotContains(4, $ids);
    }

    #[Test]
    public function privateFilterIsANoopForGuests()
    {
        // PrivacyFilter returns early for guests, leaving normal visibility
        // scoping to decide — a guest sees the public discussion and no more.
        $ids = $this->filterIds(['private' => 'true']);

        $this->assertNotContains(2, $ids);
        $this->assertNotContains(3, $ids);
        $this->assertNotContains(4, $ids);
    }
}
