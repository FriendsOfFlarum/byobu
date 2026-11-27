<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Mcp;

use Flarum\Mcp\Capability\McpContext;
use Flarum\Mcp\Exception\ToolError;
use Flarum\User\UserRepository;

class RecipientArguments
{
    public function __construct(
        protected UserRepository $users
    ) {
    }

    /**
     * @param array<string, mixed> $schema
     *
     * @return array<string, mixed>
     */
    public static function startSchema(array $schema): array
    {
        $schema['properties']['recipients'] = [
            'type'        => 'array',
            'items'       => ['type' => 'string'],
            'description' => 'Usernames to start a private discussion with, instead of a public one. You and they can read it, as can the members of any recipientGroups.',
        ];
        $schema['properties']['recipientGroups'] = [
            'type'        => 'array',
            'items'       => ['type' => 'string'],
            'description' => 'IDs of groups whose members can read the private discussion (see the groups type).',
        ];

        return $schema;
    }

    /**
     * @param array<string, mixed>                                                           $arguments
     * @param array{attributes?: array<string, mixed>, relationships?: array<string, mixed>} $body
     *
     * @return array<string, mixed>
     */
    public function startHandler(array $arguments, array $body, McpContext $context): array
    {
        $usernames = $this->strings($arguments['recipients'] ?? []);
        $groupIds = $this->strings($arguments['recipientGroups'] ?? []);

        // Without this, a list that names nobody would post the content publicly.
        if ((isset($arguments['recipients']) || isset($arguments['recipientGroups'])) && !$usernames && !$groupIds) {
            throw new ToolError('recipients and recipientGroups name nobody. Leave both out to start a public discussion.');
        }

        if ($usernames) {
            $ids = $this->users->getIdsForUsernames($usernames, $context->actor);
            $found = array_change_key_case($ids, CASE_LOWER);
            $unknown = array_filter($usernames, fn (string $username) => !isset($found[mb_strtolower($username)]));

            if ($unknown) {
                throw new ToolError('Unknown member(s): '.implode(', ', $unknown).'.');
            }

            $body['relationships']['recipientUsers'] = [
                'data' => array_map(fn ($id) => ['type' => 'users', 'id' => (string) $id], array_values($ids)),
            ];
        }

        if ($groupIds) {
            $body['relationships']['recipientGroups'] = [
                'data' => array_map(fn (string $id) => ['type' => 'groups', 'id' => $id], $groupIds),
            ];
        }

        return $body;
    }

    /**
     * @param array<string, mixed> $schema
     *
     * @return array<string, mixed>
     */
    public static function searchSchema(array $schema): array
    {
        $schema['properties']['private'] = [
            'type'        => 'boolean',
            'description' => 'Only the private discussions you can read. Other results don\'t mark which are private: never reveal a private discussion\'s content outside it.',
        ];

        return $schema;
    }

    /**
     * @param array<string, mixed> $arguments
     * @param array<string, mixed> $query     the discussions index query
     *
     * @return array<string, mixed>
     */
    public static function searchHandler(array $arguments, array $query, McpContext $context): array
    {
        if (!empty($arguments['private'])) {
            if ($context->actor->isGuest()) {
                throw new ToolError('Guests have no private discussions.');
            }

            $query['filter']['private'] = true;
        }

        return $query;
    }

    /**
     * @return list<string>
     */
    protected function strings(mixed $values): array
    {
        return array_values(array_unique(array_filter(
            array_map(fn ($value) => trim((string) $value), (array) $values),
            fn (string $value) => $value !== ''
        )));
    }
}
