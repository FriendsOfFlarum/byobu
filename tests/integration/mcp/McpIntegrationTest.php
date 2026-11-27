<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Tests\integration\mcp;

use Flarum\Discussion\Discussion;
use Flarum\Group\Group;
use Flarum\Mcp\Testing\McpTestCase;
use Flarum\User\User;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;

class McpIntegrationTest extends McpTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('fof-byobu');

        $this->prepareDatabase([
            User::class => [
                $this->normalUser(),
                ['id' => 3, 'username' => 'alice', 'email' => 'alice@example.com', 'password' => 'too-obscure', 'is_email_confirmed' => 1],
                ['id' => 4, 'username' => 'outsider', 'email' => 'outsider@example.com', 'password' => 'too-obscure', 'is_email_confirmed' => 1],
            ],
            Group::class => [
                ['id' => 10, 'name_singular' => 'Staff', 'name_plural' => 'Staff', 'color' => null, 'icon' => null, 'is_hidden' => 0],
            ],
            'group_permission' => [
                ['group_id' => Group::MEMBER_ID, 'permission' => 'discussion.startPrivateDiscussionWithUsers'],
            ],
            'discussions' => [
                ['id' => 1, 'title' => 'Public Discussion', 'slug' => 'public-discussion', 'comment_count' => 1, 'participant_count' => 1, 'created_at' => '2024-01-01 00:00:00', 'last_posted_at' => '2024-01-01 00:00:00', 'is_private' => 0, 'user_id' => 1],
                ['id' => 2, 'title' => 'Private Discussion', 'slug' => 'private-discussion', 'comment_count' => 1, 'participant_count' => 1, 'created_at' => '2024-01-01 00:00:00', 'last_posted_at' => '2024-01-01 00:00:00', 'is_private' => 1, 'user_id' => 1],
            ],
            'recipients' => [
                ['id' => 1, 'discussion_id' => 2, 'user_id' => 1, 'group_id' => null, 'created_at' => '2024-01-01 00:00:00', 'updated_at' => '2024-01-01 00:00:00', 'removed_at' => null],
                ['id' => 2, 'discussion_id' => 2, 'user_id' => 2, 'group_id' => null, 'created_at' => '2024-01-01 00:00:00', 'updated_at' => '2024-01-01 00:00:00', 'removed_at' => null],
            ],
        ]);
    }

    #[Test]
    public function start_discussion_takes_recipients_by_username(): void
    {
        $created = $this->toolOutput($this->callTool('start_discussion', [
            'title'      => 'Just us',
            'content'    => 'Secret content.',
            'recipients' => ['alice'],
        ], $this->bearer($this->developerToken(2))));

        $discussion = Discussion::query()->findOrFail($created['id']);

        $this->assertTrue((bool) $discussion->is_private);
        $this->assertEqualsCanonicalizing([2, 3], $discussion->recipientUsers()->pluck('users.id')->all());
    }

    #[Test]
    public function start_discussion_takes_recipient_groups_by_id(): void
    {
        $this->prepareDatabase([
            'group_permission' => [
                ['group_id' => Group::MEMBER_ID, 'permission' => 'discussion.startPrivateDiscussionWithGroups'],
            ],
        ]);

        $created = $this->toolOutput($this->callTool('start_discussion', [
            'title'           => 'Staff only',
            'content'         => 'Secret content.',
            'recipientGroups' => ['10'],
        ], $this->bearer($this->developerToken(2))));

        $discussion = Discussion::query()->findOrFail($created['id']);

        $this->assertTrue((bool) $discussion->is_private);
        $this->assertSame([10], $discussion->recipientGroups()->pluck('groups.id')->all());
    }

    #[Test]
    public function start_discussion_refuses_an_unknown_recipient(): void
    {
        $error = $this->toolOutput($this->callTool('start_discussion', [
            'title'      => 'Just us',
            'content'    => 'Secret content.',
            'recipients' => ['nobody'],
        ], $this->bearer($this->developerToken(2))), expectError: true);

        $this->assertStringContainsString('nobody', $error['error']);
        $this->assertSame(2, $this->database()->table('discussions')->count());
    }

    /**
     * @return array<string, array{0: array<string, mixed>}>
     */
    public static function emptyRecipients(): array
    {
        return [
            'no usernames'    => [['recipients' => []]],
            'blank usernames' => [['recipients' => [' ', '']]],
            'no groups'       => [['recipientGroups' => []]],
        ];
    }

    #[Test]
    #[DataProvider('emptyRecipients')]
    public function start_discussion_refuses_recipients_that_name_nobody(array $recipients): void
    {
        $this->toolOutput($this->callTool('start_discussion', [
            'title'   => 'Just us',
            'content' => 'Secret content.',
        ] + $recipients, $this->bearer($this->developerToken(2))), expectError: true);

        $this->assertSame(2, $this->database()->table('discussions')->count());
    }

    #[Test]
    public function start_discussion_without_recipients_stays_public(): void
    {
        $created = $this->toolOutput($this->callTool('start_discussion', [
            'title'   => 'Hello everyone',
            'content' => 'Public content.',
        ], $this->bearer($this->developerToken(2))));

        $this->assertFalse((bool) Discussion::query()->findOrFail($created['id'])->is_private);
    }

    #[Test]
    public function search_discussions_can_list_only_private_discussions(): void
    {
        $auth = $this->bearer($this->developerToken(2));

        $private = $this->toolOutput($this->callTool('search_discussions', ['private' => true], $auth));
        $all = $this->toolOutput($this->callTool('search_discussions', [], $auth));

        $this->assertSame(['2'], array_column($private['data'], 'id'));
        $this->assertEqualsCanonicalizing(['1', '2'], array_column($all['data'], 'id'));
    }

    #[Test]
    public function search_discussions_lists_no_private_discussions_for_a_non_recipient(): void
    {
        $private = $this->toolOutput($this->callTool('search_discussions', ['private' => true], $this->bearer($this->developerToken(4))));

        $this->assertSame([], $private['data']);
    }

    #[Test]
    public function search_discussions_refuses_private_for_a_guest(): void
    {
        $this->prepareDatabase([
            'group_permission' => [['group_id' => Group::GUEST_ID, 'permission' => 'mcp.use']],
        ]);

        $this->toolOutput($this->callTool('search_discussions', ['private' => true]), expectError: true);
    }

    #[Test]
    public function an_assistant_cannot_make_a_private_discussion_public(): void
    {
        $this->setting('fof-byobu.makePublic', true);

        // What the forum sends to make a discussion public.
        $error = $this->toolOutput($this->callTool('update_resource', [
            'type'          => 'discussions',
            'id'            => '2',
            'attributes'    => ['public' => '2'],
            'relationships' => ['recipientUsers' => [], 'recipientGroups' => []],
        ], $this->bearer($this->developerToken(1))), expectError: true);

        $this->assertStringContainsString('public', $error['error']);
        $this->assertSame(1, (int) $this->database()->table('discussions')->where('id', 2)->value('is_private'));
    }

    #[Test]
    public function an_assistant_cannot_change_who_is_in_a_private_discussion(): void
    {
        $error = $this->toolOutput($this->callTool('update_resource', [
            'type'          => 'discussions',
            'id'            => '2',
            'relationships' => ['recipientUsers' => [['type' => 'users', 'id' => '1'], ['type' => 'users', 'id' => '2'], ['type' => 'users', 'id' => '4']]],
        ], $this->bearer($this->developerToken(1))), expectError: true);

        $this->assertStringContainsString('recipientUsers', $error['error']);
        $this->assertSame(0, $this->database()->table('recipients')->where('discussion_id', 2)->where('user_id', 4)->count());
    }

    #[Test]
    public function the_overview_explains_private_discussions(): void
    {
        $overview = $this->overview(2);
        $instructions = array_column($overview['extensions'], 'instructions', 'id')['fof-byobu'];

        $this->assertStringContainsString('isPrivateDiscussion', $instructions);
        $this->assertStringContainsString('get_resource', $instructions);
        $this->assertStringNotContainsString('send_message', $instructions);
        $this->assertContains('discussion.startPrivateDiscussionWithUsers', array_column($overview['you']['can'], 'ability'));
    }

    #[Test]
    public function the_overview_tells_private_discussions_from_conversations_when_messages_is_enabled(): void
    {
        $this->extension('flarum-messages');

        $instructions = array_column($this->overview(2)['extensions'], 'instructions', 'id')['fof-byobu'];

        $this->assertStringContainsString('send_message', $instructions);
    }

    #[Test]
    public function describe_api_describes_the_recipient_fields(): void
    {
        $described = json_encode($this->toolOutput($this->callTool('describe_api', ['type' => 'discussions'], $this->bearer($this->developerToken(2)))));

        $this->assertStringContainsString('Only its recipients', $described);
    }

    /**
     * @return array<string, mixed>
     */
    protected function overview(int $userId): array
    {
        return json_decode($this->rpcResult($this->modern(
            'resources/read',
            ['uri' => 'flarum://forum'],
            $this->bearer($this->developerToken($userId)),
            'flarum://forum'
        ))['contents'][0]['text'], true);
    }
}
