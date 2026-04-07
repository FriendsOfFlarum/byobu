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

use Flarum\Tags\Tag;
use PHPUnit\Framework\Attributes\Test;

/**
 * Runs all private discussion creation tests with flarum/tags active, plus
 * tags-specific assertions that only apply when that extension is present.
 */
class CreatePrivateDiscussionWithTagsTest extends AbstractCreatePrivateDiscussionTest
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('flarum-tags');

        $this->prepareDatabase([
            Tag::class => [
                ['id' => 1, 'name' => 'General', 'slug' => 'general', 'color' => '#888', 'position' => 0, 'is_restricted' => 0],
            ],
        ]);
    }

    // -------------------------------------------------------------------------
    // Tags-specific tests
    // -------------------------------------------------------------------------

    #[Test]
    public function private_discussion_can_be_created_without_a_tag_when_tags_enabled(): void
    {
        $this->grantPermission('discussion.startPrivateDiscussionWithUsers');

        $result = $this->postDiscussion(2, $this->userRecipients(2, 3));

        $this->assertEquals(201, $result['status']);
    }

    #[Test]
    public function tags_supplied_with_private_discussion_payload_are_silently_dropped(): void
    {
        $this->grantPermission('discussion.startPrivateDiscussionWithUsers');

        $relationships = array_merge(
            $this->userRecipients(2, 3),
            ['tags' => ['data' => [['type' => 'tags', 'id' => '1']]]]
        );

        $result = $this->postDiscussion(2, $relationships);
        $this->assertEquals(201, $result['status'], json_encode($result['body']));

        $discussionId = $result['body']['data']['id'];

        $response = $this->send(
            $this->request('GET', "/api/discussions/$discussionId?include=tags", [
                'authenticatedAs' => 2,
            ])
        );
        $body = json_decode($response->getBody()->getContents(), true);

        $tagRelationship = $body['data']['relationships']['tags']['data'] ?? null;
        $this->assertEmpty($tagRelationship, 'Discussion has tags attached despite being private.');
    }
}
