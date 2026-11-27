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

class RecipientChangePermissionTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    protected const EDITORS = 11;

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
                ['id' => 3, 'username' => 'alice', 'email' => 'alice@example.com', 'password' => 'too-obscure', 'is_email_confirmed' => 1],
                ['id' => 4, 'username' => 'moderator', 'email' => 'moderator@example.com', 'password' => 'too-obscure', 'is_email_confirmed' => 1],
                ['id' => 5, 'username' => 'bob', 'email' => 'bob@example.com', 'password' => 'too-obscure', 'is_email_confirmed' => 1],
            ],
            Group::class => [
                ['id' => 10, 'name_singular' => 'Staff', 'name_plural' => 'Staff', 'color' => null, 'icon' => null, 'is_hidden' => 0],
                ['id' => self::EDITORS, 'name_singular' => 'Editor', 'name_plural' => 'Editors', 'color' => null, 'icon' => null, 'is_hidden' => 0],
            ],
            'group_user' => [
                ['user_id' => 2, 'group_id' => self::EDITORS],
                ['user_id' => 4, 'group_id' => Group::MODERATOR_ID],
            ],
            'group_permission' => [
                ['group_id' => self::EDITORS, 'permission' => 'discussion.editUserRecipients'],
                ['group_id' => self::EDITORS, 'permission' => 'discussion.addMoreThanTwoUserRecipients'],
                ['group_id' => Group::MODERATOR_ID, 'permission' => 'discussion.editGroupRecipients'],
                ['group_id' => Group::MODERATOR_ID, 'permission' => 'discussion.makePublic'],
            ],
            'discussions' => [
                ['id' => 1, 'title' => 'Private', 'slug' => 'private', 'comment_count' => 1, 'participant_count' => 1, 'created_at' => '2024-01-01 00:00:00', 'last_posted_at' => '2024-01-01 00:00:00', 'is_private' => 1, 'user_id' => 2],
            ],
            'recipients' => [
                ['id' => 1, 'discussion_id' => 1, 'user_id' => 2, 'group_id' => null, 'created_at' => '2024-01-01 00:00:00', 'updated_at' => '2024-01-01 00:00:00', 'removed_at' => null],
                ['id' => 2, 'discussion_id' => 1, 'user_id' => 4, 'group_id' => null, 'created_at' => '2024-01-01 00:00:00', 'updated_at' => '2024-01-01 00:00:00', 'removed_at' => null],
                ['id' => 3, 'discussion_id' => 1, 'user_id' => 5, 'group_id' => null, 'created_at' => '2024-01-01 00:00:00', 'updated_at' => '2024-01-01 00:00:00', 'removed_at' => null],
                ['id' => 4, 'discussion_id' => 1, 'user_id' => null, 'group_id' => 10, 'created_at' => '2024-01-01 00:00:00', 'updated_at' => '2024-01-01 00:00:00', 'removed_at' => null],
            ],
        ]);
    }

    #[Test]
    public function changing_only_user_recipients_keeps_the_group_recipients(): void
    {
        $this->assertSame(200, $this->patch(2, ['recipientUsers' => $this->users(2, 3, 4, 5)]));

        $this->assertSame([2, 3, 4, 5], $this->userRecipients());
        $this->assertSame([10], $this->groupRecipients());
    }

    #[Test]
    public function changing_only_group_recipients_keeps_the_user_recipients(): void
    {
        // The moderator may not add more than two members, and adds none.
        $this->assertSame(200, $this->patch(4, ['recipientGroups' => ['data' => []]]));

        $this->assertSame([], $this->groupRecipients());
        $this->assertSame([2, 4, 5], $this->userRecipients());
    }

    #[Test]
    public function sending_the_groups_unchanged_needs_no_permission_for_groups(): void
    {
        $this->assertSame(200, $this->patch(2, [
            'recipientUsers'  => $this->users(2, 4, 5, 3),
            'recipientGroups' => ['data' => [['type' => 'groups', 'id' => '10']]],
        ]));

        $this->assertSame([2, 3, 4, 5], $this->userRecipients());
    }

    #[Test]
    public function emptying_the_user_recipients_needs_permission(): void
    {
        $this->assertSame(403, $this->patch(5, ['recipientUsers' => ['data' => []]]));

        $this->assertSame([2, 4, 5], $this->userRecipients());
    }

    #[Test]
    public function emptying_the_group_recipients_needs_permission(): void
    {
        // Two members, so the limit on members can't be what refuses it.
        $this->database()->table('recipients')->where('id', 2)->update(['removed_at' => '2024-01-02 00:00:00']);

        $this->assertSame(403, $this->patch(5, ['recipientGroups' => ['data' => []]]));

        $this->assertSame([10], $this->groupRecipients());
    }

    #[Test]
    public function a_recipient_can_leave_without_permission(): void
    {
        $this->assertSame(200, $this->patch(5, ['recipientUsers' => $this->users(2, 4)]));

        $this->assertSame([2, 4], $this->userRecipients());
        $this->assertSame([10], $this->groupRecipients());
    }

    #[Test]
    public function making_a_discussion_public_needs_no_permission_to_change_recipients(): void
    {
        $this->setting('fof-byobu.makePublic', true);

        $response = $this->send($this->request('PATCH', '/api/discussions/1', [
            'authenticatedAs' => 4,
            'json'            => ['data' => ['type' => 'discussions', 'id' => '1', 'attributes' => ['public' => '1'], 'relationships' => [
                'recipientUsers'  => ['data' => []],
                'recipientGroups' => ['data' => []],
            ]]],
        ]));

        $this->assertSame(200, $response->getStatusCode(), (string) $response->getBody());
        $this->assertSame([], $this->userRecipients());
        $this->assertSame([], $this->groupRecipients());
    }

    protected function patch(int $actorId, array $relationships): int
    {
        return $this->send($this->request('PATCH', '/api/discussions/1', [
            'authenticatedAs' => $actorId,
            'json'            => ['data' => ['type' => 'discussions', 'id' => '1', 'relationships' => $relationships]],
        ]))->getStatusCode();
    }

    protected function users(int ...$ids): array
    {
        return ['data' => array_map(fn (int $id) => ['type' => 'users', 'id' => (string) $id], $ids)];
    }

    protected function userRecipients(): array
    {
        return $this->recipients('user_id');
    }

    protected function groupRecipients(): array
    {
        return $this->recipients('group_id');
    }

    protected function recipients(string $column): array
    {
        return $this->database()->table('recipients')
            ->where('discussion_id', 1)->whereNotNull($column)->whereNull('removed_at')
            ->orderBy($column)->pluck($column)->map(fn ($id) => (int) $id)->all();
    }
}
