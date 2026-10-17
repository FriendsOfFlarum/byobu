<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Tests\integration\privacy;

use Carbon\Carbon;
use Flarum\Discussion\Discussion;
use Flarum\Extend;
use Flarum\Group\Group;
use Flarum\Post\Post;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use Psr\Http\Message\ResponseInterface;

/**
 * Who can see a private discussion, through every way it can be reached.
 *
 * A private discussion is visible to its recipients (users, or members of a
 * recipient group) and to no one else: not admins, not moderators. The one
 * exception is a private discussion with a flagged post, which is visible to
 * anyone with both `discussion.viewFlags` and
 * `user.viewPrivateDiscussionsWhenFlagged`, which every admin has.
 *
 * Every rule is checked from both sides, so a test can't pass merely because
 * nobody can see anything.
 *
 * Users:   1 admin, 3 alice, 4 bob, 5 outsider,
 *          6 moderator (Flag moderators: viewFlags + viewPrivateDiscussionsWhenFlagged),
 *          7 flagviewer (Flag viewers: viewFlags only),
 *          8 leaver (was a recipient of discussion 5, removed),
 *          9 staffer (member of the Staff group),
 *          10 mod (in Flarum's Moderator group, granted viewFlags +
 *             viewPrivateDiscussionsWhenFlagged; no recipient, no posts)
 *
 * Discussions:
 *   1 public                                   post 1 (outsider)
 *   2 private: alice + bob                     post 2 (alice)
 *   3 private: alice + bob, with a flag        post 3 (alice), post 6 (bob, flagged by alice)
 *   4 private: the Staff group                 post 4 (staffer)
 *   5 private: alice, leaver removed           post 5 (alice)
 */
class PrivateDiscussionVisibilityTest extends TestCase
{
    private const PRIVATE_DISCUSSIONS = [2, 3, 4, 5];

    /** Each discussion's posts. */
    private const POSTS = [1 => [1], 2 => [2], 3 => [3, 6], 4 => [4], 5 => [5]];

    /** bcrypt of "too-obscure", so users can log in to the forum. */
    private const PASSWORD = '$2y$10$LO59tiT7uggl6Oe23o/O6.utnF6ipngYjvMvaxo1TciKqBttDNKim';

    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('flarum-flags', 'fof-byobu');

        $this->extend((new Extend\Csrf())->exemptRoute('login'));

        $now = Carbon::now();

        $user = fn (int $id, string $username) => ['id' => $id, 'username' => $username, 'email' => "$username@example.com", 'password' => self::PASSWORD, 'is_email_confirmed' => 1];
        $discussion = fn (int $id, int $userId, bool $private, int $lastPostId, int $comments = 1) => ['id' => $id, 'title' => "Discussion $id", 'user_id' => $userId, 'created_at' => $now, 'last_posted_at' => $now, 'is_private' => (int) $private, 'comment_count' => $comments, 'participant_count' => 1, 'first_post_id' => $id, 'last_post_id' => $lastPostId, 'last_post_number' => $comments];
        $post = fn (int $id, int $discussionId, int $number, int $userId) => ['id' => $id, 'discussion_id' => $discussionId, 'number' => $number, 'user_id' => $userId, 'type' => 'comment', 'content' => '<t><p>Post '.$id.'</p></t>', 'created_at' => $now, 'is_private' => 0];
        $recipient = fn (int $discussionId, ?int $userId, ?int $groupId, bool $removed = false) => ['discussion_id' => $discussionId, 'user_id' => $userId, 'group_id' => $groupId, 'removed_at' => $removed ? $now : null, 'created_at' => $now, 'updated_at' => $now];

        $this->prepareDatabase([
            User::class => [
                $user(3, 'alice'), $user(4, 'bob'), $user(5, 'outsider'), $user(6, 'moderator'),
                $user(7, 'flagviewer'), $user(8, 'leaver'), $user(9, 'staffer'), $user(10, 'mod'),
            ],
            Group::class => [
                ['id' => 10, 'name_singular' => 'Staff', 'name_plural' => 'Staff', 'color' => null, 'icon' => null, 'is_hidden' => 0],
                ['id' => 11, 'name_singular' => 'Flag moderator', 'name_plural' => 'Flag moderators', 'color' => null, 'icon' => null, 'is_hidden' => 0],
                ['id' => 12, 'name_singular' => 'Flag viewer', 'name_plural' => 'Flag viewers', 'color' => null, 'icon' => null, 'is_hidden' => 0],
            ],
            'group_user' => [
                ['user_id' => 6, 'group_id' => 11],
                ['user_id' => 7, 'group_id' => 12],
                ['user_id' => 9, 'group_id' => 10],
                ['user_id' => 10, 'group_id' => Group::MODERATOR_ID],
            ],
            'group_permission' => [
                ['group_id' => Group::MODERATOR_ID, 'permission' => 'discussion.viewFlags'],
                ['group_id' => Group::MODERATOR_ID, 'permission' => 'user.viewPrivateDiscussionsWhenFlagged'],
                ['group_id' => 11, 'permission' => 'discussion.viewFlags'],
                ['group_id' => 11, 'permission' => 'user.viewPrivateDiscussionsWhenFlagged'],
                ['group_id' => 12, 'permission' => 'discussion.viewFlags'],
            ],
            Discussion::class => [
                $discussion(1, 5, false, 1),
                $discussion(2, 3, true, 2),
                $discussion(3, 3, true, 6, 2),
                $discussion(4, 9, true, 4),
                $discussion(5, 3, true, 5),
            ],
            Post::class => [
                $post(1, 1, 1, 5),
                $post(2, 2, 1, 3),
                $post(3, 3, 1, 3),
                $post(6, 3, 2, 4),
                $post(4, 4, 1, 9),
                $post(5, 5, 1, 3),
            ],
            'recipients' => [
                $recipient(2, 3, null), $recipient(2, 4, null),
                $recipient(3, 3, null), $recipient(3, 4, null),
                $recipient(4, null, 10),
                $recipient(5, 3, null), $recipient(5, 8, null, removed: true),
            ],
            'flags' => [
                ['id' => 1, 'post_id' => 6, 'type' => 'user', 'user_id' => 3, 'created_at' => $now],
            ],
            'notifications' => [
                // The leaver's notification from before they were removed.
                ['id' => 1, 'user_id' => 8, 'from_user_id' => 3, 'type' => 'byobuPrivateDiscussionAdded', 'subject_id' => 5, 'created_at' => $now],
                ['id' => 2, 'user_id' => 4, 'from_user_id' => 3, 'type' => 'byobuPrivateDiscussionCreated', 'subject_id' => 2, 'created_at' => $now],
            ],
        ]);
    }

    /**
     * Each actor, and the discussions they may see.
     */
    public static function actors(): array
    {
        return [
            'guest'                                 => [null, [1]],
            'outsider'                              => [5, [1]],
            'admin (sees only the flagged one)'     => [1, [1, 3]],
            'moderator who may view flagged PDs'    => [6, [1, 3]],
            'moderator who may only view flags'     => [7, [1]],
            'Moderator group member, not a participant' => [10, [1, 3]],
            'recipient removed from discussion 5'   => [8, [1]],
            'recipient alice'                       => [3, [1, 2, 3, 5]],
            'recipient bob'                         => [4, [1, 2, 3]],
            'member of recipient group Staff'       => [9, [1, 4]],
        ];
    }

    /**
     * Every API route that returns discussions or their posts shows the actor
     * exactly the discussions they may see.
     */
    #[Test]
    #[DataProvider('actors')]
    public function api_shows_only_the_private_discussions_an_actor_may_see(?int $actorId, array $visible): void
    {
        $leaks = [];
        $missing = [];

        $check = function (string $route, int $discussionId, bool $seen) use ($visible, &$leaks, &$missing) {
            $allowed = in_array($discussionId, $visible, true);

            if ($seen && !$allowed) {
                $leaks[] = "discussion $discussionId via $route";
            } elseif (!$seen && $allowed) {
                $missing[] = "discussion $discussionId via $route";
            }
        };

        foreach (self::POSTS as $discussionId => $postIds) {
            [$status] = $this->get("/api/discussions/$discussionId", $actorId);
            $check("GET /api/discussions/$discussionId", $discussionId, $status === 200);

            [, $body] = $this->get('/api/posts', $actorId, ['filter' => ['discussion' => $discussionId]]);
            $check("GET /api/posts?filter[discussion]=$discussionId", $discussionId, !empty($body['data']));

            foreach ($postIds as $postId) {
                [$status] = $this->get("/api/posts/$postId", $actorId);
                $check("GET /api/posts/$postId", $discussionId, $status === 200);
            }
        }

        [, $body] = $this->get('/api/discussions', $actorId, ['page' => ['limit' => 50]]);
        $listed = $this->ids($body['data'] ?? []);
        foreach (self::PRIVATE_DISCUSSIONS as $id) {
            $check('GET /api/discussions', $id, in_array($id, $listed, true));
        }

        [, $body] = $this->get('/api/discussions', $actorId, ['filter' => ['byobu' => 'alice']]);
        foreach ($this->ids($body['data'] ?? []) as $id) {
            $check('GET /api/discussions?filter[byobu]=alice', $id, true);
        }

        // Every post of the discussions' authors, with each post's discussion
        // included, as a user's profile requests them.
        [, $body] = $this->get('/api/posts', $actorId, ['filter' => ['author' => 'alice,bob,staffer', 'type' => 'comment'], 'include' => 'discussion', 'page' => ['limit' => 50]]);
        $postIds = $this->ids($body['data'] ?? []);
        $included = $this->ids($body['included'] ?? [], 'discussions');
        foreach (self::PRIVATE_DISCUSSIONS as $id) {
            $check('GET /api/posts?filter[author]=…', $id, !empty(array_intersect(self::POSTS[$id], $postIds)));
            $check('GET /api/posts?filter[author]=…&include=discussion (included)', $id, in_array($id, $included, true));
        }

        // Alice's private discussions are her own business.
        [, $body] = $this->get('/api/users/3', $actorId, ['include' => 'privateDiscussions']);
        foreach ($this->ids($body['included'] ?? [], 'discussions') as $id) {
            if ($actorId !== 3) {
                $leaks[] = "discussion $id via GET /api/users/3?include=privateDiscussions";
            }
        }

        $this->assertSame([], $leaks, 'Private discussions leaked.');
        $this->assertSame([], $missing, 'Private discussions hidden from someone who may see them.');
    }

    #[Test]
    public function a_moderator_who_is_not_a_participant_sees_a_flagged_private_discussion(): void
    {
        // An ordinary moderator: not an admin, not a recipient, never posted.
        $this->assertSame([Group::MODERATOR_ID], $this->database()->table('group_user')->where('user_id', 10)->pluck('group_id')->map(fn ($id) => (int) $id)->all());
        $this->assertSame(0, $this->database()->table('recipients')->where('user_id', 10)->count());
        $this->assertSame(0, $this->database()->table('posts')->where('user_id', 10)->count());

        [$status, $body] = $this->get('/api/discussions/3', 10);
        $this->assertSame(200, $status, 'The moderator cannot open the flagged private discussion.');
        $this->assertSame('Discussion 3', $body['data']['attributes']['title']);

        [, $body] = $this->get('/api/posts', 10, ['filter' => ['discussion' => 3]]);
        $this->assertEqualsCanonicalizing([3, 6], $this->ids($body['data'] ?? []), "The moderator cannot read the flagged private discussion's posts.");

        [$status, $body] = $this->get('/api/flags', 10);
        $this->assertSame(200, $status);
        $this->assertContains(1, $this->ids($body['data'] ?? []), 'The moderator cannot see the flag.');
        $this->assertContains(3, $this->ids($body['included'] ?? [], 'discussions'), "The flag doesn't lead the moderator to its discussion.");

        [, $body] = $this->get('/api/discussions', 10, ['page' => ['limit' => 50]]);
        $listed = $this->ids($body['data'] ?? []);
        $this->assertContains(3, $listed, 'The flagged private discussion is missing from the moderator\'s list.');

        // The same two users' private discussion without a flag stays closed.
        $this->assertSame(404, $this->get('/api/discussions/2', 10)[0], 'The moderator can open an unflagged private discussion.');
        $this->assertSame([], array_values(array_intersect([2, 4, 5], $listed)), 'Unflagged private discussions are in the moderator\'s list.');

        // And the same in the forum, logged in.
        $this->primeForumApiClient();
        $mod = $this->login('mod');
        $this->assertSame(200, $this->forumPage('/d/3', $mod)->getStatusCode(), 'The moderator cannot open the flagged private discussion in the forum.');
        $this->assertSame(404, $this->forumPage('/d/2', $mod)->getStatusCode(), 'The moderator can open an unflagged private discussion in the forum.');
    }

    #[Test]
    public function dismissing_the_flag_closes_the_private_discussion_to_the_moderator_again(): void
    {
        $this->assertSame(200, $this->get('/api/discussions/3', 10)[0]);

        $response = $this->send($this->request('DELETE', '/api/posts/6/flags', ['authenticatedAs' => 10]));
        $this->assertSame(204, $response->getStatusCode(), 'The moderator could not dismiss the flag.');

        $this->assertSame(404, $this->get('/api/discussions/3', 10)[0], 'The moderator still sees the private discussion after dismissing its flag.');
        $this->assertSame(404, $this->get('/api/posts/6', 10)[0], 'The moderator still sees the formerly flagged post.');
        $this->assertSame(200, $this->get('/api/discussions/3', 3)[0], 'Dismissing the flag locked a recipient out.');
    }

    #[Test]
    public function a_flag_opens_the_whole_private_discussion_to_flag_moderators(): void
    {
        // Not only the flagged post (6): the rest of the discussion too.
        $this->assertSame(200, $this->get('/api/posts/3', 6)[0]);
        $this->assertSame(200, $this->get('/api/posts/6', 6)[0]);
    }

    #[Test]
    public function the_flags_list_shows_a_private_flagged_post_only_to_who_may_see_it(): void
    {
        $flagged = function (int $actorId): bool {
            [$status, $body] = $this->get('/api/flags', $actorId);

            return $status === 200 && in_array(1, $this->ids($body['data'] ?? []), true);
        };

        $this->assertTrue($flagged(6), 'A moderator who may view flagged private discussions cannot see the flag.');
        $this->assertTrue($flagged(1), 'An admin cannot see the flag.');
        $this->assertFalse($flagged(7), 'A moderator who may only view flags sees a flag in a private discussion.');
        $this->assertFalse($flagged(5), 'An outsider sees a flag in a private discussion.');
    }

    #[Test]
    public function a_removed_recipient_no_longer_sees_the_discussion_through_old_notifications(): void
    {
        [$status, $body] = $this->get('/api/notifications', 8);
        $this->assertSame(200, $status);
        $this->assertNotContains(1, $this->ids($body['data'] ?? []), 'The removed recipient still gets a notification about the discussion.');
        $this->assertNotContains(5, $this->ids($body['included'] ?? [], 'discussions'), 'The removed recipient sees the discussion through a notification.');

        [, $body] = $this->get('/api/notifications', 4);
        $this->assertContains(2, $this->ids($body['data'] ?? []), 'A recipient cannot see their notification.');
        $this->assertContains(2, $this->ids($body['included'] ?? [], 'discussions'), 'A recipient cannot see the discussion through their notification.');
    }

    #[Test]
    public function the_forum_shows_a_private_discussion_page_only_to_recipients(): void
    {
        $this->primeForumApiClient();

        foreach (self::PRIVATE_DISCUSSIONS as $id) {
            $this->assertSame(404, $this->forumPage("/d/$id")->getStatusCode(), "A guest can open private discussion $id.");
        }
        $this->assertSame(200, $this->forumPage('/d/1')->getStatusCode(), 'A guest cannot open the public discussion.');

        $outsider = $this->login('outsider');
        foreach (self::PRIVATE_DISCUSSIONS as $id) {
            $this->assertSame(404, $this->forumPage("/d/$id", $outsider)->getStatusCode(), "An outsider can open private discussion $id.");
        }

        $alice = $this->login('alice');
        $this->assertSame(200, $this->forumPage('/d/2', $alice)->getStatusCode(), 'A recipient cannot open their private discussion.');
        $this->assertStringNotContainsString('Discussion 4', (string) $this->forumPage('/d/2', $alice)->getBody(), "Another private discussion's title appears on a recipient's page.");
    }

    /**
     * @return array{0: int, 1: array}
     */
    private function get(string $path, ?int $actorId, array $queryParams = []): array
    {
        $response = $this->send(
            $this->request('GET', $path, array_filter(['authenticatedAs' => $actorId]))->withQueryParams($queryParams)
        );

        return [$response->getStatusCode(), json_decode((string) $response->getBody(), true) ?? []];
    }

    /**
     * Core's API client builds its middleware stack once per app, on its first
     * request, so the first internal request decides for every later one
     * whether errors are thrown or turned into error documents. A forum
     * discussion page needs them thrown to answer 404; logging in first would
     * build the stack the other way and turn a 404 into a 500. Each real HTTP
     * request gets a fresh app, but these tests send several through one.
     */
    private function primeForumApiClient(): void
    {
        $this->forumPage('/d/1');
    }

    private function forumPage(string $path, ?ResponseInterface $login = null): ResponseInterface
    {
        return $this->send($this->request('GET', $path, array_filter(['cookiesFrom' => $login])));
    }

    private function login(string $username): ResponseInterface
    {
        $response = $this->send($this->request('POST', '/login', ['json' => ['identification' => $username, 'password' => 'too-obscure']]));

        $this->assertSame(200, $response->getStatusCode(), "$username could not log in.");

        return $response;
    }

    /**
     * @return int[]
     */
    private function ids(array $resources, ?string $type = null): array
    {
        return array_values(array_map(
            fn (array $resource) => (int) $resource['id'],
            array_filter($resources, fn (array $resource) => $type === null || $resource['type'] === $type)
        ));
    }
}
