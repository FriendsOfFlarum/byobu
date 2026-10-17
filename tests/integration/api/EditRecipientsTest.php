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
use Flarum\User\User;
use PHPUnit\Framework\Attributes\Test;

/**
 * Editing the recipients of an existing private discussion, with the global
 * `discussion.editUserRecipients` permission and the starter-only
 * `discussion.editOwnUserRecipients` permission.
 */
class EditRecipientsTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('fof-byobu');

        $this->prepareDatabase([
            User::class => [
                $this->normalUser(),                                                                                                       // id=2: starter
                ['id' => 3, 'username' => 'alice', 'email' => 'alice@example.com', 'password' => 'too-obscure', 'is_email_confirmed' => 1], // other recipient
                ['id' => 4, 'username' => 'bob',   'email' => 'bob@example.com',   'password' => 'too-obscure', 'is_email_confirmed' => 1], // outsider
                ['id' => 5, 'username' => 'carol', 'email' => 'carol@example.com', 'password' => 'too-obscure', 'is_email_confirmed' => 1], // another recipient
            ],
            'group_permission' => [
                ['group_id' => Group::MEMBER_ID, 'permission' => 'discussion.startPrivateDiscussionWithUsers'],
                ['group_id' => Group::MEMBER_ID, 'permission' => 'discussion.addMoreThanTwoUserRecipients'],
            ],
        ]);
    }

    protected function grantPermission(string $permission, int $groupId = Group::MEMBER_ID): void
    {
        $this->prepareDatabase([
            'group_permission' => [
                ['group_id' => $groupId, 'permission' => $permission],
            ],
        ]);
    }

    protected function recipients(array $userIds, array $groupIds = []): array
    {
        return [
            'recipientUsers' => [
                'data' => array_map(fn ($id) => ['type' => 'users', 'id' => (string) $id], $userIds),
            ],
            'recipientGroups' => [
                'data' => array_map(fn ($id) => ['type' => 'groups', 'id' => (string) $id], $groupIds),
            ],
        ];
    }

    /**
     * Normal user (id=2) starts a private discussion with the given recipients.
     */
    protected function startPrivateDiscussion(array $userIds, array $groupIds = []): int
    {
        $response = $this->send(
            $this->request('POST', '/api/discussions', [
                'authenticatedAs' => 2,
                'json'            => [
                    'data' => [
                        'type'          => 'discussions',
                        'attributes'    => ['title' => 'Private discussion', 'content' => 'Secret content.'],
                        'relationships' => $this->recipients($userIds, $groupIds),
                    ],
                ],
            ])
        );

        $this->assertEquals(201, $response->getStatusCode(), (string) $response->getBody());

        return (int) json_decode((string) $response->getBody(), true)['data']['id'];
    }

    protected function patchRecipients(int $discussionId, int $actorId, array $userIds, array $groupIds = []): int
    {
        return $this->send(
            $this->request('PATCH', "/api/discussions/$discussionId", [
                'authenticatedAs' => $actorId,
                'json'            => [
                    'data' => [
                        'type'          => 'discussions',
                        'id'            => (string) $discussionId,
                        'relationships' => $this->recipients($userIds, $groupIds),
                    ],
                ],
            ])
        )->getStatusCode();
    }

    protected function getDiscussion(int $discussionId, int $actorId): array
    {
        $response = $this->send(
            $this->request('GET', "/api/discussions/$discussionId", ['authenticatedAs' => $actorId])
        );

        return [
            'status' => $response->getStatusCode(),
            'body'   => json_decode((string) $response->getBody(), true),
        ];
    }

    // -------------------------------------------------------------------------
    // Starter-only permission
    // -------------------------------------------------------------------------

    #[Test]
    public function starter_without_any_edit_permission_cannot_add_users(): void
    {
        $id = $this->startPrivateDiscussion([3]);

        $this->assertEquals(403, $this->patchRecipients($id, 2, [2, 3, 4]));
        $this->assertEquals(404, $this->getDiscussion($id, 4)['status']);
    }

    #[Test]
    public function starter_with_own_permission_can_add_users(): void
    {
        $this->grantPermission('discussion.editOwnUserRecipients');
        $id = $this->startPrivateDiscussion([3]);

        $this->assertEquals(200, $this->patchRecipients($id, 2, [2, 3, 4]));
        $this->assertEquals(200, $this->getDiscussion($id, 4)['status']);
    }

    #[Test]
    public function starter_with_own_permission_can_remove_other_users(): void
    {
        $this->grantPermission('discussion.editOwnUserRecipients');
        $id = $this->startPrivateDiscussion([3, 5]);

        $this->assertEquals(200, $this->patchRecipients($id, 2, [2, 3]));
        $this->assertEquals(404, $this->getDiscussion($id, 5)['status']);
        $this->assertEquals(200, $this->getDiscussion($id, 3)['status']);
    }

    #[Test]
    public function other_recipient_with_own_permission_cannot_edit_users(): void
    {
        $this->grantPermission('discussion.editOwnUserRecipients');
        $id = $this->startPrivateDiscussion([3, 5]);

        // alice (3) is a recipient but not the starter.
        $this->assertEquals(403, $this->patchRecipients($id, 3, [2, 3, 5, 4]));
        $this->assertEquals(403, $this->patchRecipients($id, 3, [2, 3]));
        $this->assertEquals(404, $this->getDiscussion($id, 4)['status']);
        $this->assertEquals(200, $this->getDiscussion($id, 5)['status']);
    }

    #[Test]
    public function can_edit_user_recipients_attribute_reflects_starter_permission(): void
    {
        $this->grantPermission('discussion.editOwnUserRecipients');
        $id = $this->startPrivateDiscussion([3]);

        $starter = $this->getDiscussion($id, 2)['body']['data']['attributes'];
        $this->assertTrue($starter['canEditUserRecipients']);
        $this->assertTrue($starter['canEditRecipients']);

        $other = $this->getDiscussion($id, 3)['body']['data']['attributes'];
        $this->assertFalse($other['canEditUserRecipients']);
        $this->assertFalse($other['canEditRecipients']);
    }

    #[Test]
    public function starter_with_own_permission_can_edit_users_when_discussion_has_unchanged_groups(): void
    {
        $this->grantPermission('discussion.startPrivateDiscussionWithGroups');
        $this->grantPermission('discussion.editOwnUserRecipients');
        $id = $this->startPrivateDiscussion([3], [Group::MODERATOR_ID]);

        // Groups are resubmitted unchanged, as the recipient modal does; only users change.
        $this->assertEquals(200, $this->patchRecipients($id, 2, [2, 3, 4], [Group::MODERATOR_ID]));
        $this->assertEquals(200, $this->getDiscussion($id, 4)['status']);
    }

    #[Test]
    public function starter_with_own_user_permission_cannot_change_groups(): void
    {
        $this->grantPermission('discussion.startPrivateDiscussionWithGroups');
        $this->grantPermission('discussion.editOwnUserRecipients');
        $id = $this->startPrivateDiscussion([3], [Group::MODERATOR_ID]);

        $this->assertEquals(403, $this->patchRecipients($id, 2, [2, 3], []));
    }

    // -------------------------------------------------------------------------
    // Global permission and existing behaviour
    // -------------------------------------------------------------------------

    #[Test]
    public function recipient_with_global_permission_can_edit_users_of_discussion_they_did_not_start(): void
    {
        $this->grantPermission('discussion.editUserRecipients');
        $id = $this->startPrivateDiscussion([3]);

        $this->assertEquals(200, $this->patchRecipients($id, 3, [2, 3, 4]));
        $this->assertEquals(200, $this->getDiscussion($id, 4)['status']);
    }

    #[Test]
    public function any_recipient_can_still_remove_themself_without_permission(): void
    {
        $id = $this->startPrivateDiscussion([3, 5]);

        $this->assertEquals(200, $this->patchRecipients($id, 3, [2, 5]));
        $this->assertEquals(404, $this->getDiscussion($id, 3)['status']);
    }
}
