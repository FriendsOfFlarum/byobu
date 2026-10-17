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
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use PHPUnit\Framework\Attributes\Test;

/**
 * Recipient users are included by default on the discussion endpoints. When
 * the actor may edit credentials, serialising a user asks whether it is an
 * admin (UserPolicy::editCredentials), which reads its groups: that must not
 * load each recipient's groups one user at a time.
 *
 * Fixtures: alice (3) and users 4–10 are the recipient users of private
 * discussion 1. Members may edit credentials.
 */
class RecipientUsersGroupsLoadingTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('fof-byobu');

        $now = Carbon::now();

        $users = [];
        $recipients = [];

        foreach (range(3, 10) as $id) {
            $users[] = ['id' => $id, 'username' => "user$id", 'email' => "user$id@example.com", 'password' => 'too-obscure', 'is_email_confirmed' => 1];
            $recipients[] = ['discussion_id' => 1, 'user_id' => $id, 'group_id' => null, 'removed_at' => null, 'created_at' => $now, 'updated_at' => $now];
        }

        $this->prepareDatabase([
            User::class       => $users,
            Discussion::class => [
                ['id' => 1, 'title' => 'Private', 'user_id' => 3, 'created_at' => $now, 'is_private' => 1, 'comment_count' => 1, 'participant_count' => 1],
            ],
            'recipients'       => $recipients,
            'group_permission' => [
                ['group_id' => Group::MEMBER_ID, 'permission' => 'user.editCredentials'],
            ],
        ]);
    }

    #[Test]
    public function showing_a_private_discussion_does_not_load_groups_per_recipient(): void
    {
        $this->assertSame([], $this->usersWithGroupsLoadedSingly('/api/discussions/1'));
    }

    #[Test]
    public function listing_private_discussions_does_not_load_groups_per_recipient(): void
    {
        $this->assertSame([], $this->usersWithGroupsLoadedSingly('/api/discussions', ['filter' => ['private' => 'true']]));
    }

    /**
     * The users, other than the actor, whose groups were loaded by a query for
     * that one user while alice requested the path.
     *
     * @return int[]
     */
    private function usersWithGroupsLoadedSingly(string $path, array $queryParams = []): array
    {
        $database = $this->database();
        $database->enableQueryLog();
        $database->flushQueryLog();

        $response = $this->send(
            $this->request('GET', $path, ['authenticatedAs' => 3])->withQueryParams($queryParams)
        );

        $queries = $database->getQueryLog();
        $database->disableQueryLog();

        $body = (string) $response->getBody();

        $this->assertSame(200, $response->getStatusCode(), $body);
        $users = array_filter(json_decode($body, true)['included'] ?? [], fn (array $resource) => $resource['type'] === 'users');
        $this->assertCount(8, $users, 'Expected the 8 recipient users to be included.');

        $ids = [];

        foreach ($queries as $query) {
            if (str_contains(str_replace(['`', '"'], '', $query['query']), 'group_user.user_id = ?')) {
                $ids[] = (int) $query['bindings'][0];
            }
        }

        return array_values(array_diff(array_unique($ids), [3]));
    }
}
