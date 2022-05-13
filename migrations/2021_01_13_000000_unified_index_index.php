<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;
use Illuminate\Support\Arr;

return [
    'up' => function (Builder $schema) {
        $schema->table('users', function (Blueprint $table) {
            $table->index('unified_index_with_byobu');
        });
    },
    'down' => function (Builder $schema) {
        $schema->table('users', function (Blueprint $table) use ($schema) {
            $connection = $schema->getConnection();
            $schemaManager = $connection->getDoctrineSchemaManager();
            $existingIndexes = $schemaManager->listTableIndexes($table->getTable());

            // If migration 2021_04_21_000000_drop_users_unified_index_column has been applied, this index already no longer exists
            // Unfortunately we can't call the protected createIndexName method so we have to build the index name manually
            $indexName = strtolower(str_replace(['-', '.'], '_', $connection->getTablePrefix().$table->getTable()).'_unified_index_with_byobu_index');

            if (!Arr::exists($existingIndexes, $indexName)) {
                return;
            }

            // Use array syntax so the blueprint "guesses" the full index name
            $table->dropIndex(['unified_index_with_byobu']);
        });
    },
];
