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
use Flarum\Extend;
use Flarum\Group\Group;
use Flarum\Post\Post;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use Illuminate\Database\Eloquent\Builder;
use PHPUnit\Framework\Attributes\Test;

/**
 * Discussions reached through another resource's include (a user's posts with
 * `include=discussion`, as on a profile; notification subjects; flagged posts)
 * aren't loaded by the discussion endpoints that eager load their recipients.
 * Every serialised discussion asks whether it is private, through the
 * isPrivateDiscussion field and the `tag` policy behind flarum/tags' canTag,
 * so that must not load recipients one discussion at a time.
 *
 * Fixtures (every post is bob's):
 *   1 admin, 3 alice, 4 bob. Staff group (10) contains alice.
 *
 *   Discussions 1–6 — public, no recipients
 *   Discussion 7    — private, recipient users alice + bob; post 7 is flagged
 *   Discussion 8    — private, recipient group Staff; post 8 is flagged
 *   Discussion 9    — is_private but no recipients: made private by another
 *                     extension (as flarum/approval does), visible to everyone
 *                     through the viewPrivate scope registered below
 *
 *   Alice has a byobu notification for each of discussions 7 and 8.
 */
class RecipientsLoadingTest extends TestCase
{
    private const PUBLIC_DISCUSSIONS = [1, 2, 3, 4, 5, 6];

    /**
     * The decoded body of the last {@see get()} response.
     */
    private array $lastBody = [];

    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('flarum-tags', 'flarum-flags', 'fof-byobu');

        $this->extend(
            (new Extend\ModelVisibility(Discussion::class))
                ->scope(function (User $actor, Builder $query) {
                    $query->orWhere('discussions.id', 9);
                }, 'viewPrivate')
        );

        $now = Carbon::now();

        $discussions = [];
        $posts = [];

        foreach (range(1, 9) as $id) {
            $discussions[] = ['id' => $id, 'title' => "Discussion $id", 'user_id' => 4, 'created_at' => $now, 'is_private' => (int) ($id > 6), 'comment_count' => 1, 'participant_count' => 1, 'first_post_id' => $id, 'last_post_id' => $id, 'last_post_number' => 1];
            $posts[] = ['id' => $id, 'discussion_id' => $id, 'number' => 1, 'user_id' => 4, 'type' => 'comment', 'content' => '<t><p>Hello</p></t>', 'created_at' => $now, 'is_private' => 0];
        }

        $this->prepareDatabase([
            User::class => [
                ['id' => 3, 'username' => 'alice', 'email' => 'alice@example.com', 'password' => 'too-obscure', 'is_email_confirmed' => 1],
                ['id' => 4, 'username' => 'bob',   'email' => 'bob@example.com',   'password' => 'too-obscure', 'is_email_confirmed' => 1],
            ],
            Group::class => [
                ['id' => 10, 'name_singular' => 'Staff', 'name_plural' => 'Staff', 'color' => null, 'icon' => null, 'is_hidden' => 0],
            ],
            'group_user' => [
                ['user_id' => 3, 'group_id' => 10],
            ],
            Discussion::class => $discussions,
            Post::class       => $posts,
            'recipients'      => [
                ['discussion_id' => 7, 'user_id' => 3, 'group_id' => null, 'removed_at' => null, 'created_at' => $now, 'updated_at' => $now],
                ['discussion_id' => 7, 'user_id' => 4, 'group_id' => null, 'removed_at' => null, 'created_at' => $now, 'updated_at' => $now],
                ['discussion_id' => 8, 'user_id' => null, 'group_id' => 10, 'removed_at' => null, 'created_at' => $now, 'updated_at' => $now],
            ],
            'notifications' => [
                ['id' => 1, 'user_id' => 3, 'from_user_id' => 4, 'type' => 'byobuPrivateDiscussionCreated', 'subject_id' => 7, 'created_at' => $now],
                ['id' => 2, 'user_id' => 3, 'from_user_id' => 4, 'type' => 'byobuPrivateDiscussionCreated', 'subject_id' => 8, 'created_at' => $now],
            ],
            'flags' => [
                ['id' => 1, 'post_id' => 7, 'type' => 'user', 'user_id' => 4, 'created_at' => $now],
                ['id' => 2, 'post_id' => 8, 'type' => 'user', 'user_id' => 4, 'created_at' => $now],
            ],
        ]);
    }

    #[Test]
    public function public_discussions_do_not_load_recipients_for_a_guest(): void
    {
        $loaded = $this->discussionsWithRecipientsLoadedSingly($this->bobsPosts(null));

        $this->assertSame(
            [],
            array_values(array_intersect($loaded, self::PUBLIC_DISCUSSIONS)),
            'Recipients were loaded one public discussion at a time.'
        );
    }

    #[Test]
    public function discussions_of_posts_do_not_load_recipients_one_at_a_time(): void
    {
        $loaded = $this->discussionsWithRecipientsLoadedSingly($this->bobsPosts(3));

        $this->assertSame([7 => true, 8 => true], array_intersect_key($this->isPrivateDiscussion(), [7 => 0, 8 => 0]));
        $this->assertSame([], $loaded, 'Recipients were loaded one discussion at a time.');
    }

    #[Test]
    public function notification_subjects_do_not_load_recipients_one_at_a_time(): void
    {
        $loaded = $this->discussionsWithRecipientsLoadedSingly($this->get('/api/notifications', 3));

        $this->assertSame([7 => true, 8 => true], $this->isPrivateDiscussion());
        $this->assertSame([], $loaded, 'Recipients were loaded one discussion at a time.');
    }

    #[Test]
    public function discussions_of_flagged_posts_do_not_load_recipients_one_at_a_time(): void
    {
        $loaded = $this->discussionsWithRecipientsLoadedSingly($this->get('/api/flags', 1));

        $this->assertSame([7 => true, 8 => true], $this->isPrivateDiscussion());
        $this->assertSame([], $loaded, 'Recipients were loaded one discussion at a time.');
    }

    #[Test]
    public function only_discussions_with_recipients_are_private_discussions(): void
    {
        $this->bobsPosts(3);

        $this->assertSame([
            1 => false, 2 => false, 3 => false, 4 => false, 5 => false, 6 => false,
            7 => true,
            8 => true,
            // is_private alone doesn't make a byobu discussion.
            9 => false,
        ], $this->isPrivateDiscussion());
    }

    /**
     * Bob's posts with their discussions included, as his profile requests
     * them, returning the queries the request ran.
     *
     * @return array<array{query: string, bindings: array}>
     */
    private function bobsPosts(?int $actorId): array
    {
        return $this->get('/api/posts', $actorId, [
            'filter'  => ['author' => 'bob', 'type' => 'comment'],
            'sort'    => '-createdAt',
            'page'    => ['limit' => 20],
            'include' => 'discussion',
        ]);
    }

    /**
     * GET an API path, returning the queries the request ran.
     *
     * @return array<array{query: string, bindings: array}>
     */
    private function get(string $path, ?int $actorId, array $queryParams = []): array
    {
        $database = $this->database();
        $database->enableQueryLog();
        $database->flushQueryLog();

        $response = $this->send(
            $this->request('GET', $path, array_filter(['authenticatedAs' => $actorId]))
                ->withQueryParams($queryParams)
        );

        $queries = $database->getQueryLog();
        $database->disableQueryLog();

        $body = (string) $response->getBody();

        $this->assertSame(200, $response->getStatusCode(), $body);

        $this->lastBody = json_decode($body, true);

        return $queries;
    }

    /**
     * The isPrivateDiscussion attribute of each discussion in the last
     * response, by id.
     *
     * @return array<int, bool>
     */
    private function isPrivateDiscussion(): array
    {
        $isPrivate = [];

        foreach ($this->lastBody['included'] ?? [] as $resource) {
            if ($resource['type'] === 'discussions') {
                $isPrivate[(int) $resource['id']] = $resource['attributes']['isPrivateDiscussion'];
            }
        }

        ksort($isPrivate);

        return $isPrivate;
    }

    /**
     * The discussions whose recipients were loaded by a query for that one
     * discussion (a lazy-loaded recipientUsers or recipientGroups relation),
     * rather than eager loaded for the page.
     *
     * @param array<array{query: string, bindings: array}> $queries
     *
     * @return int[]
     */
    private function discussionsWithRecipientsLoadedSingly(array $queries): array
    {
        $ids = [];

        foreach ($queries as $query) {
            if (str_contains(str_replace(['`', '"'], '', $query['query']), 'recipients.discussion_id = ?')) {
                $ids[] = (int) $query['bindings'][0];
            }
        }

        return array_values(array_unique($ids));
    }
}
