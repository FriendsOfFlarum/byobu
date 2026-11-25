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

class PartialRecipientUpdateTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    /**
     * Writing recipientUsers loads each named user, as when creating one
     * ({@see AbstractCreatePrivateDiscussionTest::allowedRepeatedQueries()}).
     */
    protected function allowedRepeatedQueries(): array
    {
        return ['users`.`id` = ? limit ?', 'users"."id" = ? limit ?'];
    }

    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('fof-byobu');

        $this->prepareDatabase([
            User::class => [
                $this->normalUser(),
                ['id' => 4, 'username' => 'moderator', 'email' => 'moderator@example.com', 'password' => 'too-obscure', 'is_email_confirmed' => 1],
                ['id' => 3, 'username' => 'alice', 'email' => 'alice@example.com', 'password' => 'too-obscure', 'is_email_confirmed' => 1],
            ],
            Group::class => [
                ['id' => 10, 'name_singular' => 'Staff', 'name_plural' => 'Staff', 'color' => null, 'icon' => null, 'is_hidden' => 0],
            ],
            'group_permission' => [
                ['group_id' => Group::MEMBER_ID, 'permission' => 'discussion.editUserRecipients'],
                ['group_id' => Group::MODERATOR_ID, 'permission' => 'discussion.editGroupRecipients'],
            ],
            'group_user' => [
                ['user_id' => 4, 'group_id' => Group::MODERATOR_ID],
            ],
            'discussions' => [
                ['id' => 1, 'title' => 'Private', 'slug' => 'private', 'comment_count' => 1, 'participant_count' => 1, 'created_at' => '2024-01-01 00:00:00', 'last_posted_at' => '2024-01-01 00:00:00', 'is_private' => 1, 'user_id' => 2],
            ],
            'recipients' => [
                ['id' => 1, 'discussion_id' => 1, 'user_id' => 2, 'group_id' => null, 'created_at' => '2024-01-01 00:00:00', 'updated_at' => '2024-01-01 00:00:00', 'removed_at' => null],
                ['id' => 3, 'discussion_id' => 1, 'user_id' => 4, 'group_id' => null, 'created_at' => '2024-01-01 00:00:00', 'updated_at' => '2024-01-01 00:00:00', 'removed_at' => null],
                ['id' => 2, 'discussion_id' => 1, 'user_id' => null, 'group_id' => 10, 'created_at' => '2024-01-01 00:00:00', 'updated_at' => '2024-01-01 00:00:00', 'removed_at' => null],
            ],
        ]);
    }

    #[Test]
    public function changing_only_user_recipients_keeps_the_group_recipients(): void
    {
        $response = $this->send($this->request('PATCH', '/api/discussions/1', [
            'authenticatedAs' => 2,
            'json' => ['data' => ['type' => 'discussions', 'id' => '1', 'relationships' => [
                'recipientUsers' => ['data' => [['type' => 'users', 'id' => '2'], ['type' => 'users', 'id' => '3']]],
            ]]],
        ]));

        $this->assertSame(200, $response->getStatusCode(), (string) $response->getBody());
        $this->assertSame(
            [10],
            $this->database()->table('recipients')->where('discussion_id', 1)->whereNotNull('group_id')->whereNull('removed_at')->pluck('group_id')->map(fn ($id) => (int) $id)->all()
        );
    }

    #[Test]
    public function changing_only_group_recipients_keeps_the_user_recipients(): void
    {
        $response = $this->send($this->request('PATCH', '/api/discussions/1', [
            'authenticatedAs' => 4,
            'json' => ['data' => ['type' => 'discussions', 'id' => '1', 'relationships' => [
                'recipientGroups' => ['data' => []],
            ]]],
        ]));

        $this->assertSame(200, $response->getStatusCode(), (string) $response->getBody());
        $this->assertEqualsCanonicalizing(
            [2, 4],
            $this->database()->table('recipients')->where('discussion_id', 1)->whereNotNull('user_id')->whereNull('removed_at')->pluck('user_id')->map(fn ($id) => (int) $id)->all()
        );
    }
}
