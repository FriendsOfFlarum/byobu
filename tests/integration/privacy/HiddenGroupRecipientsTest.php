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
use Flarum\Group\Group;
use Flarum\Post\Post;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use PHPUnit\Framework\Attributes\Test;

/**
 * Private discussions addressed to a hidden group.
 *
 * The API serialises only the groups an actor may see, so members of a hidden
 * group (without `viewHiddenGroups`) aren't told it is a recipient. byobu must
 * still treat the discussion as private, and must not read the group's absence
 * from what a client sends back as its removal.
 *
 * Users: 3 alice and 4 bob (both in the hidden group Secret), 5 carol,
 *        6 keeper (may see hidden groups, a recipient of discussion 2).
 *
 * Discussions (by alice):
 *   1 private: Secret only (as created before the starter became a recipient, #168)
 *   2 private: Secret and alice
 */
class HiddenGroupRecipientsTest extends TestCase
{
    /**
     * Writing `recipientUsers` resolves each named user through the API (core's
     * json-api-server ToMany linkage calls findOrFail per identifier), as in
     * AbstractCreatePrivateDiscussionTest.
     */
    protected function allowedRepeatedQueries(): array
    {
        return ['users`.`id` = ? limit ?', 'users"."id" = ? limit ?'];
    }

    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('flarum-tags', 'fof-byobu');

        $this->setting('allow_tag_change', '-1');
        $this->setting('fof-byobu.makePublic', '1');

        $now = Carbon::now();

        $this->prepareDatabase([
            User::class => [
                ['id' => 3, 'username' => 'alice', 'email' => 'alice@example.com', 'password' => 'too-obscure', 'is_email_confirmed' => 1],
                ['id' => 4, 'username' => 'bob',   'email' => 'bob@example.com',   'password' => 'too-obscure', 'is_email_confirmed' => 1],
                ['id' => 5, 'username' => 'carol', 'email' => 'carol@example.com', 'password' => 'too-obscure', 'is_email_confirmed' => 1],
                ['id' => 6, 'username' => 'keeper', 'email' => 'keeper@example.com', 'password' => 'too-obscure', 'is_email_confirmed' => 1],
            ],
            Group::class => [
                ['id' => 13, 'name_singular' => 'Secret', 'name_plural' => 'Secret', 'color' => null, 'icon' => null, 'is_hidden' => 1],
                ['id' => 14, 'name_singular' => 'Keeper', 'name_plural' => 'Keepers', 'color' => null, 'icon' => null, 'is_hidden' => 0],
            ],
            'group_user' => [
                ['user_id' => 3, 'group_id' => 13],
                ['user_id' => 4, 'group_id' => 13],
                ['user_id' => 6, 'group_id' => 14],
            ],
            'group_permission' => [
                ['group_id' => Group::MEMBER_ID, 'permission' => 'discussion.editUserRecipients'],
                ['group_id' => Group::MEMBER_ID, 'permission' => 'discussion.startPrivateDiscussionWithGroups'],
                ['group_id' => Group::MEMBER_ID, 'permission' => 'discussion.makePublic'],
                ['group_id' => Group::MEMBER_ID, 'permission' => 'discussion.addMoreThanTwoUserRecipients'],
                ['group_id' => 14, 'permission' => 'viewHiddenGroups'],
                // Members may edit users only, so an edit must not count a kept hidden group as theirs.
                ['group_id' => 14, 'permission' => 'discussion.editGroupRecipients'],
            ],
            Discussion::class => [
                ['id' => 1, 'title' => 'For Secret', 'user_id' => 3, 'created_at' => $now, 'last_posted_at' => $now, 'is_private' => 1, 'comment_count' => 1, 'participant_count' => 1, 'first_post_id' => 1, 'last_post_id' => 1, 'last_post_number' => 1],
                ['id' => 2, 'title' => 'For Secret and alice', 'user_id' => 3, 'created_at' => $now, 'last_posted_at' => $now, 'is_private' => 1, 'comment_count' => 1, 'participant_count' => 1, 'first_post_id' => 2, 'last_post_id' => 2, 'last_post_number' => 1],
            ],
            Post::class => [
                ['id' => 1, 'discussion_id' => 1, 'number' => 1, 'user_id' => 3, 'type' => 'comment', 'content' => '<t><p>Hello</p></t>', 'created_at' => $now, 'is_private' => 0],
                ['id' => 2, 'discussion_id' => 2, 'number' => 1, 'user_id' => 3, 'type' => 'comment', 'content' => '<t><p>Hello</p></t>', 'created_at' => $now, 'is_private' => 0],
            ],
            'recipients' => [
                ['discussion_id' => 1, 'user_id' => null, 'group_id' => 13, 'removed_at' => null, 'created_at' => $now, 'updated_at' => $now],
                ['discussion_id' => 2, 'user_id' => null, 'group_id' => 13, 'removed_at' => null, 'created_at' => $now, 'updated_at' => $now],
                ['discussion_id' => 2, 'user_id' => 3, 'group_id' => null, 'removed_at' => null, 'created_at' => $now, 'updated_at' => $now],
                ['discussion_id' => 2, 'user_id' => 6, 'group_id' => null, 'removed_at' => null, 'created_at' => $now, 'updated_at' => $now],
            ],
        ]);
    }

    #[Test]
    public function a_discussion_for_a_hidden_group_is_private_to_its_members(): void
    {
        $body = $this->show(1, 4);

        $this->assertTrue($body['data']['attributes']['isPrivateDiscussion'], 'A member sees a hidden-group private discussion as public.');
    }

    #[Test]
    public function a_discussion_for_a_hidden_group_cannot_be_tagged(): void
    {
        // Tag changes are otherwise always allowed for the author.
        $body = $this->show(1, 3);

        $this->assertFalse($body['data']['attributes']['canTag'], 'The author may tag a hidden-group private discussion.');
    }

    #[Test]
    public function a_user_who_cannot_see_a_hidden_group_cannot_address_it(): void
    {
        $response = $this->send(
            $this->request('POST', '/api/discussions', [
                'authenticatedAs' => 5,
                'json'            => ['data' => ['type' => 'discussions', 'attributes' => ['title' => 'Guessing', 'content' => 'Hello'], 'relationships' => [
                    'recipientGroups' => ['data' => [['type' => 'groups', 'id' => '13']]],
                ]]],
            ])
        );

        $this->assertSame(404, $response->getStatusCode(), 'A hidden group could be addressed by someone who cannot see it.');
        $this->assertSame(0, $this->database()->table('recipients')->where('group_id', 13)->whereNotIn('discussion_id', [1, 2])->count());
    }

    private function show(int $discussionId, int $actorId): array
    {
        $response = $this->send($this->request('GET', "/api/discussions/$discussionId", ['authenticatedAs' => $actorId]));

        $this->assertSame(200, $response->getStatusCode(), "User $actorId cannot open discussion $discussionId.");

        return json_decode((string) $response->getBody(), true);
    }
}
