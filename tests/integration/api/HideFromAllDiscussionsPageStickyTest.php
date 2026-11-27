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

use Flarum\Discussion\Discussion;
use Flarum\Search\Database\DatabaseSearchState;
use Flarum\Search\SearchCriteria;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use FoF\Byobu\Filters\Discussion\HidePrivateDiscussionsFromAllDiscussionsPage;
use PHPUnit\Framework\Attributes\Test;

/**
 * Stands in for flarum/sticky's union, which it builds from a copy of the
 * query, so the test doesn't need sticky or its boot order.
 */
class HideFromAllDiscussionsPageStickyTest extends TestCase
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
    public function private_discussion_is_hidden_from_a_union_added_before_the_mutator(): void
    {
        $this->app();

        $actor = User::findOrFail(2);
        $query = Discussion::query()->whereVisibleTo($actor);

        $union = clone $query->getQuery();
        $union->where('discussions.id', 2);
        $query->getQuery()->union($union);

        $state = new DatabaseSearchState($actor, false);
        $state->setQuery($query);

        $this->app()->getContainer()->make(HidePrivateDiscussionsFromAllDiscussionsPage::class)(
            $state,
            new SearchCriteria($actor, [])
        );

        $this->assertEquals([1], $query->get()->pluck('id')->map(fn ($id) => (int) $id)->sort()->values()->all());
    }
}
