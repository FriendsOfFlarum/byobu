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

use Flarum\Group\Group;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;

/**
 * Shared test logic for creating private discussions.
 *
 * Subclasses boot the app with or without flarum/tags to confirm that byobu
 * behaves identically in both configurations. Tags-specific assertions live
 * only in {@see CreatePrivateDiscussionWithTagsTest}.
 *
 * Permissions are NOT granted in setUp. Each test that needs a permission
 * calls grantPermission() explicitly, keeping "no permission → 403" tests clean.
 */
abstract class AbstractCreatePrivateDiscussionTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('fof-byobu');

        $this->prepareDatabase([
            'users' => [
                // id=1: admin (seeded by Flarum TestCase)
                $this->normalUser(),                                      // id=2: plain member, no byobu perms by default
                ['id' => 3, 'username' => 'alice',    'email' => 'alice@example.com',    'password' => 'too-obscure', 'is_email_confirmed' => 1],
                ['id' => 4, 'username' => 'bob',      'email' => 'bob@example.com',      'password' => 'too-obscure', 'is_email_confirmed' => 1],
                ['id' => 5, 'username' => 'outsider', 'email' => 'outsider@example.com', 'password' => 'too-obscure', 'is_email_confirmed' => 1],
                ['id' => 6, 'username' => 'blocker',  'email' => 'blocker@example.com',  'password' => 'too-obscure', 'is_email_confirmed' => 1, 'blocks_byobu_pd' => 1],
            ],
            'groups' => [
                // Groups 1–4 are seeded by Flarum (admin/guest/member/mod). Add a custom group.
                ['id' => 10, 'name_singular' => 'Staff', 'name_plural' => 'Staff', 'color' => null, 'icon' => null, 'is_hidden' => 0],
            ],
            'group_user' => [
                // alice (3) and bob (4) are in Staff (10); outsider (5) is not.
                ['user_id' => 3, 'group_id' => 10],
                ['user_id' => 4, 'group_id' => 10],
            ],
        ]);
    }

    // -------------------------------------------------------------------------
    // Helpers
    // -------------------------------------------------------------------------

    protected function grantPermission(string $permission, int $groupId = Group::MEMBER_ID): void
    {
        $this->prepareDatabase([
            'group_permission' => [
                ['group_id' => $groupId, 'permission' => $permission],
            ],
        ]);
    }

    /**
     * POST /api/discussions. Returns ['status' => int, 'body' => array].
     */
    protected function postDiscussion(int $actorId, array $relationships = [], array $extraAttributes = []): array
    {
        $response = $this->send(
            $this->request('POST', '/api/discussions', [
                'authenticatedAs' => $actorId,
                'json' => [
                    'data' => [
                        'type' => 'discussions',
                        'attributes' => array_merge([
                            'title'   => 'Private discussion',
                            'content' => 'Secret content.',
                        ], $extraAttributes),
                        'relationships' => $relationships,
                    ],
                ],
            ])
        );

        return [
            'status' => $response->getStatusCode(),
            'body'   => json_decode($response->getBody()->getContents(), true),
        ];
    }

    protected function getDiscussion(int $discussionId, ?int $actorId = null): int
    {
        return $this->send(
            $this->request('GET', "/api/discussions/$discussionId", array_filter([
                'authenticatedAs' => $actorId,
            ]))
        )->getStatusCode();
    }

    protected function userRecipients(int ...$ids): array
    {
        return [
            'recipientUsers' => [
                'data' => array_map(fn ($id) => ['type' => 'users', 'id' => (string) $id], $ids),
            ],
        ];
    }

    protected function groupRecipients(int ...$ids): array
    {
        return [
            'recipientGroups' => [
                'data' => array_map(fn ($id) => ['type' => 'groups', 'id' => (string) $id], $ids),
            ],
        ];
    }

    // -------------------------------------------------------------------------
    // Permission: user recipients
    // -------------------------------------------------------------------------

    /**
     * @test
     */
    public function member_with_user_permission_can_create_private_discussion_with_users()
    {
        $this->grantPermission('discussion.startPrivateDiscussionWithUsers');

        $result = $this->postDiscussion(2, $this->userRecipients(2, 3));

        $this->assertEquals(201, $result['status']);
    }

    /**
     * @test
     */
    public function member_without_user_permission_cannot_create_private_discussion_with_users()
    {
        $result = $this->postDiscussion(2, $this->userRecipients(2, 3));

        $this->assertEquals(403, $result['status']);
    }

    // -------------------------------------------------------------------------
    // Permission: group recipients
    // -------------------------------------------------------------------------

    /**
     * @test
     */
    public function member_with_group_permission_can_create_private_discussion_with_groups()
    {
        $this->grantPermission('discussion.startPrivateDiscussionWithGroups');

        $result = $this->postDiscussion(2, $this->groupRecipients(10));

        $this->assertEquals(201, $result['status']);
    }

    /**
     * @test
     */
    public function member_without_group_permission_cannot_create_private_discussion_with_groups()
    {
        $result = $this->postDiscussion(2, $this->groupRecipients(10));

        $this->assertEquals(403, $result['status']);
    }

    /**
     * @test
     *
     * Having the user permission does not grant the group permission.
     */
    public function member_with_only_user_permission_cannot_create_private_discussion_with_groups()
    {
        $this->grantPermission('discussion.startPrivateDiscussionWithUsers');

        $result = $this->postDiscussion(2, $this->groupRecipients(10));

        $this->assertEquals(403, $result['status']);
    }

    // -------------------------------------------------------------------------
    // Visibility: user recipients
    // -------------------------------------------------------------------------

    /**
     * @test
     */
    public function private_discussion_with_users_is_visible_to_recipients_only()
    {
        $this->grantPermission('discussion.startPrivateDiscussionWithUsers');

        $result = $this->postDiscussion(2, $this->userRecipients(2, 3));
        $this->assertEquals(201, $result['status'], json_encode($result['body']));

        $discussionId = $result['body']['data']['id'];

        $this->assertEquals(200, $this->getDiscussion($discussionId, 2), 'Actor (id=2) cannot read own private discussion.');
        $this->assertEquals(200, $this->getDiscussion($discussionId, 3), 'Recipient alice (id=3) cannot read the private discussion.');
        $this->assertEquals(404, $this->getDiscussion($discussionId, 5), 'Outsider (id=5) can read the private discussion.');
        $this->assertEquals(404, $this->getDiscussion($discussionId),    'Guest can read the private discussion.');
    }

    // -------------------------------------------------------------------------
    // Visibility: group recipients
    // -------------------------------------------------------------------------

    /**
     * @test
     */
    public function private_discussion_with_group_is_visible_to_group_members_only()
    {
        $this->grantPermission('discussion.startPrivateDiscussionWithGroups');

        // Actor (2) sends to Staff group (10). alice (3) and bob (4) are members; outsider (5) is not.
        $result = $this->postDiscussion(2, $this->groupRecipients(10));
        $this->assertEquals(201, $result['status'], json_encode($result['body']));

        $discussionId = $result['body']['data']['id'];

        $this->assertEquals(200, $this->getDiscussion($discussionId, 3), 'alice (id=3, Staff member) cannot read the group-private discussion.');
        $this->assertEquals(200, $this->getDiscussion($discussionId, 4), 'bob (id=4, Staff member) cannot read the group-private discussion.');
        $this->assertEquals(404, $this->getDiscussion($discussionId, 5), 'Outsider (id=5) can read the group-private discussion.');
        $this->assertEquals(404, $this->getDiscussion($discussionId),    'Guest can read the group-private discussion.');
    }

    // -------------------------------------------------------------------------
    // Visibility: mixed user + group recipients
    // -------------------------------------------------------------------------

    /**
     * @test
     */
    public function private_discussion_with_users_and_groups_is_visible_to_all_recipients()
    {
        $this->grantPermission('discussion.startPrivateDiscussionWithUsers');
        $this->grantPermission('discussion.startPrivateDiscussionWithGroups');

        $result = $this->postDiscussion(2, array_merge(
            $this->userRecipients(2),
            $this->groupRecipients(10)
        ));
        $this->assertEquals(201, $result['status'], json_encode($result['body']));

        $discussionId = $result['body']['data']['id'];

        $this->assertEquals(200, $this->getDiscussion($discussionId, 2), 'Actor (id=2) cannot read own private discussion.');
        $this->assertEquals(200, $this->getDiscussion($discussionId, 3), 'alice (id=3) cannot read the discussion (via group).');
        $this->assertEquals(200, $this->getDiscussion($discussionId, 4), 'bob (id=4) cannot read the discussion (via group).');
        $this->assertEquals(404, $this->getDiscussion($discussionId, 5), 'Outsider (id=5) can read the discussion.');
        $this->assertEquals(404, $this->getDiscussion($discussionId),    'Guest can read the discussion.');
    }

    // -------------------------------------------------------------------------
    // blocks_byobu_pd
    // -------------------------------------------------------------------------

    /**
     * @test
     */
    public function cannot_add_user_who_has_blocked_private_discussions()
    {
        $this->grantPermission('discussion.startPrivateDiscussionWithUsers');

        $result = $this->postDiscussion(2, $this->userRecipients(2, 6));

        $this->assertEquals(403, $result['status']);
    }

    /**
     * @test
     */
    public function can_add_blocking_user_when_actor_has_override_permission()
    {
        $this->grantPermission('discussion.startPrivateDiscussionWithUsers');
        $this->grantPermission('discussion.startPrivateDiscussionWithBlockers');

        $result = $this->postDiscussion(2, $this->userRecipients(2, 6));

        $this->assertEquals(201, $result['status']);
    }

    /**
     * @test
     */
    public function actor_who_has_blocked_private_discussions_can_still_create_one()
    {
        $this->grantPermission('discussion.startPrivateDiscussionWithUsers');

        $this->prepareDatabase([
            'users' => [
                ['id' => 2, 'username' => 'normal', 'email' => 'normal@machine.local', 'password' => 'too-obscure', 'is_email_confirmed' => 1, 'blocks_byobu_pd' => 1],
            ],
        ]);

        $result = $this->postDiscussion(2, $this->userRecipients(2, 3));

        $this->assertEquals(201, $result['status']);
    }

    // -------------------------------------------------------------------------
    // Issue #168: actor excluded from own recipients
    // -------------------------------------------------------------------------

    /**
     * @test
     *
     * Reproduces issue #168: a user creates a private discussion without including
     * themselves in the recipient list. The creator must always be auto-added as a
     * recipient so they can read what they created.
     */
    public function creator_is_always_a_recipient_of_their_own_private_discussion()
    {
        $this->grantPermission('discussion.startPrivateDiscussionWithUsers');

        // Actor (2) deliberately omits themselves — only alice (3) is in the payload.
        $result = $this->postDiscussion(2, $this->userRecipients(3));
        $this->assertEquals(201, $result['status'], json_encode($result['body']));

        $discussionId = $result['body']['data']['id'];

        $this->assertEquals(200, $this->getDiscussion($discussionId, 2), 'Creator (id=2) is locked out of their own private discussion (issue #168).');
        $this->assertEquals(200, $this->getDiscussion($discussionId, 3), 'alice (id=3) cannot read the private discussion.');
        $this->assertEquals(404, $this->getDiscussion($discussionId, 5), 'Outsider (id=5) can read the private discussion.');
    }

    /**
     * @test
     *
     * Variant of issue #168 with group recipients: actor sends to a group they are
     * not a member of and omits themselves from the user recipient list.
     */
    public function creator_is_always_a_recipient_when_sending_to_group_they_are_not_in()
    {
        $this->grantPermission('discussion.startPrivateDiscussionWithGroups');

        // Actor (2) is not in Staff group (10). They send only to the group.
        $result = $this->postDiscussion(2, $this->groupRecipients(10));
        $this->assertEquals(201, $result['status'], json_encode($result['body']));

        $discussionId = $result['body']['data']['id'];

        $this->assertEquals(200, $this->getDiscussion($discussionId, 2), 'Creator (id=2) is locked out of a group-private discussion they started (issue #168).');
    }
}
