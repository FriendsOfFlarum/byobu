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
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use PHPUnit\Framework\Attributes\Test;

/**
 * The byobu gambit resolves whatever name the forum displays, which with
 * flarum/nicknames enabled is the nickname rather than the username.
 *
 * Display names cannot be matched directly — DisplayName\DriverInterface only
 * maps user -> string with no reverse lookup — so
 * {@see \FoF\Byobu\Filters\Discussion\ByobuFilter::resolveUser()} falls back to
 * the nickname column when one is present.
 *
 * Fixtures:
 *   1 admin, 2 normal, 3 alice (nickname "Ali"), 4 bob (no nickname)
 *   Discussion 2 is private between alice and bob.
 */
class ByobuFilterWithNicknamesTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('fof-byobu', 'flarum-nicknames');

        $now = Carbon::now();

        $this->prepareDatabase([
            User::class => [
                $this->normalUser(),
                ['id' => 3, 'username' => 'alice', 'nickname' => 'Ali', 'email' => 'alice@example.com', 'password' => 'too-obscure', 'is_email_confirmed' => 1],
                ['id' => 4, 'username' => 'bob',   'nickname' => null,  'email' => 'bob@example.com',   'password' => 'too-obscure', 'is_email_confirmed' => 1],
            ],
            Discussion::class => [
                ['id' => 2, 'title' => 'Alice and Bob', 'user_id' => 3, 'created_at' => $now, 'is_private' => 1, 'comment_count' => 1],
            ],
            'recipients' => [
                ['discussion_id' => 2, 'user_id' => 3, 'group_id' => null, 'removed_at' => null, 'created_at' => $now, 'updated_at' => $now],
                ['discussion_id' => 2, 'user_id' => 4, 'group_id' => null, 'removed_at' => null, 'created_at' => $now, 'updated_at' => $now],
            ],
        ]);

        $this->setting('display_name_driver', 'nickname');
    }

    protected function filterIds(string $value, int $actorId): array
    {
        $response = $this->send(
            $this->request('GET', '/api/discussions', ['authenticatedAs' => $actorId])
                ->withQueryParams(['filter' => ['byobu' => $value]])
        );

        $this->assertEquals(200, $response->getStatusCode(), 'Search request failed');

        $body = json_decode($response->getBody()->getContents(), true);

        return array_map(fn ($discussion) => (int) $discussion['id'], $body['data'] ?? []);
    }

    #[Test]
    public function byobuFilterResolvesANickname()
    {
        // "Ali" is what the forum displays for alice, so it is what a user types.
        $this->assertContains(2, $this->filterIds('Ali', 4));
    }

    #[Test]
    public function byobuFilterStillResolvesTheUsernameWhenANicknameIsSet()
    {
        $this->assertContains(2, $this->filterIds('alice', 4));
    }

    #[Test]
    public function byobuFilterResolvesUsersWithoutANickname()
    {
        $this->assertContains(2, $this->filterIds('bob', 3));
    }

    #[Test]
    public function byobuFilterWithAnUnknownNicknameReturnsNoResults()
    {
        $this->assertSame([], $this->filterIds('NotANickname', 4));
    }
}
