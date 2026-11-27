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

use Flarum\Discussion\Search\DiscussionSearcher;
use Flarum\Extend;
use Flarum\Search\Database\DatabaseSearchDriver;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use FoF\Byobu\Tests\fixtures\RefineFilter;
use FoF\Byobu\Tests\fixtures\WindowFilter;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use Psr\Http\Message\ResponseInterface;

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

        $this->extend(
            (new Extend\SearchDriver(DatabaseSearchDriver::class))
                ->addFilter(DiscussionSearcher::class, RefineFilter::class)
                ->addFilter(DiscussionSearcher::class, WindowFilter::class)
        );

        $this->prepareDatabase([
            User::class => [
                $this->normalUser(),
            ],
            'discussions' => [
                ['id' => 1, 'title' => 'Public Discussion', 'slug' => 'public-discussion', 'comment_count' => 1, 'participant_count' => 1, 'created_at' => '2024-01-01 00:00:00', 'last_posted_at' => '2024-01-01 00:00:00', 'is_private' => 0, 'user_id' => 1],
                ['id' => 2, 'title' => 'Private Discussion', 'slug' => 'private-discussion', 'comment_count' => 1, 'participant_count' => 1, 'created_at' => '2024-01-01 00:00:00', 'last_posted_at' => '2024-01-01 00:00:00', 'is_private' => 1, 'user_id' => 1],
                ['id' => 3, 'title' => 'Made Public', 'slug' => 'made-public', 'comment_count' => 1, 'participant_count' => 1, 'created_at' => '2024-01-01 00:00:00', 'last_posted_at' => '2024-01-01 00:00:00', 'is_private' => 0, 'user_id' => 1],
            ],
            'recipients' => [
                ['id' => 1, 'discussion_id' => 2, 'user_id' => 2, 'group_id' => null, 'created_at' => '2024-01-01 00:00:00', 'updated_at' => '2024-01-01 00:00:00', 'removed_at' => null],
                ['id' => 2, 'discussion_id' => 3, 'user_id' => 2, 'group_id' => null, 'created_at' => '2024-01-01 00:00:00', 'updated_at' => '2024-01-01 00:00:00', 'removed_at' => '2024-01-02 00:00:00'],
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
        $this->assertContains(3, $ids, 'A discussion made public should be visible when setting is on');
    }

    #[Test]
    #[DataProvider('filtersThatKeepTheList')]
    public function private_discussion_stays_hidden_with_a_filter_that_keeps_the_list(string $filter): void
    {
        $response = $this->send(
            $this->request('GET', '/api/discussions', [
                'authenticatedAs' => 2,
            ])->withQueryParams(['filter' => [$filter => 'x']])
        );

        $this->assertEquals(200, $response->getStatusCode());

        $ids = $this->discussionIds($response);

        $this->assertNotContains(2, $ids);
        $this->assertContains(1, $ids);
        $this->assertContains(3, $ids);
    }

    public static function filtersThatKeepTheList(): array
    {
        return [
            'refine filter' => ['refine'],
            'window filter' => ['window'],
        ];
    }

    #[Test]
    public function private_discussion_is_listed_by_a_filter_that_picks_another_list(): void
    {
        $response = $this->send(
            $this->request('GET', '/api/discussions', [
                'authenticatedAs' => 2,
            ])->withQueryParams(['filter' => ['private' => '1']])
        );

        $this->assertEquals(200, $response->getStatusCode());

        $this->assertEquals([2], $this->discussionIds($response));
    }

    private function discussionIds(ResponseInterface $response): array
    {
        $json = json_decode($response->getBody()->getContents(), true);

        return array_map(fn ($d) => (int) $d['id'], $json['data'] ?? []);
    }
}
