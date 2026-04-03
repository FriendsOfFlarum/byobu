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

use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use PHPUnit\Framework\Attributes\Test;
use Psr\Http\Message\ResponseInterface;

/**
 * Fixture layout:
 *   - User 2 (normal): a recipient of discussion 2 (the private one)
 *   - Discussion 1: public (is_private = 0, no recipients row)
 *   - Discussion 2: private (is_private = 1, user 2 is a recipient)
 *
 * Two concrete test classes below boot the app with the setting OFF and ON
 * respectively. They are separate classes so each gets a fresh app instance,
 * avoiding any settings-cache cross-contamination between tests.
 */

/**
 * Setting DISABLED (default) — private discussion should still appear in the list.
 */
class HideFromAllDiscussionsPageDisabledTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    public function setUp(): void
    {
        parent::setUp();

        $this->extension('fof-byobu');

        $this->prepareDatabase([
            User::class => [
                $this->normalUser(),
            ],
            'discussions' => [
                ['id' => 1, 'title' => 'Public Discussion', 'slug' => 'public-discussion', 'comment_count' => 1, 'participant_count' => 1, 'created_at' => '2024-01-01 00:00:00', 'last_posted_at' => '2024-01-01 00:00:00', 'is_private' => 0, 'user_id' => 1],
                ['id' => 2, 'title' => 'Private Discussion', 'slug' => 'private-discussion', 'comment_count' => 1, 'participant_count' => 1, 'created_at' => '2024-01-01 00:00:00', 'last_posted_at' => '2024-01-01 00:00:00', 'is_private' => 1, 'user_id' => 1],
            ],
            'recipients' => [
                ['id' => 1, 'discussion_id' => 2, 'user_id' => 2, 'group_id' => null, 'created_at' => '2024-01-01 00:00:00', 'updated_at' => '2024-01-01 00:00:00', 'removed_at' => null],
            ],
        ]);
    }

    #[Test]
    public function private_discussion_is_visible_in_list_when_setting_is_disabled(): void
    {
        $response = $this->send(
            $this->request('GET', '/api/discussions', [
                'authenticatedAs' => 2,
            ])
        );

        $this->assertEquals(200, $response->getStatusCode());

        $ids = $this->discussionIds($response);

        $this->assertContains(2, $ids, 'Private discussion should be visible when setting is off');
        $this->assertContains(1, $ids, 'Public discussion should be visible when setting is off');
    }

    private function discussionIds(ResponseInterface $response): array
    {
        $json = json_decode($response->getBody()->getContents(), true);

        return array_map(fn ($d) => (int) $d['id'], $json['data'] ?? []);
    }
}

/**
 * Setting ENABLED — private discussions should be hidden from the list.
 */
class HideFromAllDiscussionsPageEnabledTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    public function setUp(): void
    {
        parent::setUp();

        $this->extension('fof-byobu');

        $this->setting('fof-byobu.hide_from_all_discussions_page', '1');

        $this->prepareDatabase([
            User::class => [
                $this->normalUser(),
            ],
            'discussions' => [
                ['id' => 1, 'title' => 'Public Discussion', 'slug' => 'public-discussion', 'comment_count' => 1, 'participant_count' => 1, 'created_at' => '2024-01-01 00:00:00', 'last_posted_at' => '2024-01-01 00:00:00', 'is_private' => 0, 'user_id' => 1],
                ['id' => 2, 'title' => 'Private Discussion', 'slug' => 'private-discussion', 'comment_count' => 1, 'participant_count' => 1, 'created_at' => '2024-01-01 00:00:00', 'last_posted_at' => '2024-01-01 00:00:00', 'is_private' => 1, 'user_id' => 1],
            ],
            'recipients' => [
                ['id' => 1, 'discussion_id' => 2, 'user_id' => 2, 'group_id' => null, 'created_at' => '2024-01-01 00:00:00', 'updated_at' => '2024-01-01 00:00:00', 'removed_at' => null],
            ],
        ]);
    }

    #[Test]
    public function private_discussion_is_hidden_from_list_when_setting_is_enabled(): void
    {
        $response = $this->send(
            $this->request('GET', '/api/discussions', [
                'authenticatedAs' => 2,
            ])
        );

        $this->assertEquals(200, $response->getStatusCode());

        $ids = $this->discussionIds($response);

        $this->assertNotContains(2, $ids, 'Private discussion should be hidden when setting is on');
        $this->assertContains(1, $ids, 'Public discussion should still be visible when setting is on');
    }

    private function discussionIds(ResponseInterface $response): array
    {
        $json = json_decode($response->getBody()->getContents(), true);

        return array_map(fn ($d) => (int) $d['id'], $json['data'] ?? []);
    }
}
