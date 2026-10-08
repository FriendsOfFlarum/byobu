<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Tests\integration\api;

use Carbon\Carbon;
use Flarum\Discussion\Discussion;
use Flarum\Post\Post;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use PHPUnit\Framework\Attributes\Test;

/**
 * Discussions included on a list of posts are asked whether they are private,
 * which reads their recipients: those must load once for the page.
 */
class ListPostsRecipientsQueryCountTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    private const DISCUSSIONS = 8;

    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('fof-byobu');

        $discussions = $posts = [];

        for ($i = 1; $i <= self::DISCUSSIONS; $i++) {
            $discussions[] = ['id' => $i, 'title' => "Discussion $i", 'created_at' => Carbon::now(), 'last_posted_at' => Carbon::now(), 'user_id' => 2, 'first_post_id' => $i, 'comment_count' => 1];
            $posts[] = ['id' => $i, 'discussion_id' => $i, 'number' => 1, 'created_at' => Carbon::now(), 'user_id' => 2, 'type' => 'comment', 'content' => '<t><p>Post '.$i.'</p></t>'];
        }

        $this->prepareDatabase([
            User::class       => [$this->normalUser()],
            Discussion::class => $discussions,
            Post::class       => $posts,
        ]);
    }

    #[Test]
    public function recipients_of_the_included_discussions_load_once()
    {
        $this->app();
        $db = $this->database();
        $db->enableQueryLog();
        $db->flushQueryLog();

        $response = $this->send(
            $this->request('GET', '/api/posts', ['authenticatedAs' => 2])
                ->withQueryParams(['filter' => ['author' => 'normal'], 'include' => 'discussion'])
        );

        $sql = array_map(fn ($q) => str_replace(['`', '"'], '', $q), array_column($db->getQueryLog(), 'query'));
        $db->flushQueryLog();

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertCount(self::DISCUSSIONS, json_decode($response->getBody()->getContents(), true)['data']);

        $users = array_filter($sql, fn ($q) => str_contains($q, 'from users inner join recipients'));
        $groups = array_filter($sql, fn ($q) => str_contains($q, 'from groups inner join recipients'));

        $this->assertLessThanOrEqual(1, count($users), 'Recipient users load in one query');
        $this->assertLessThanOrEqual(1, count($groups), 'Recipient groups load in one query');
    }
}
