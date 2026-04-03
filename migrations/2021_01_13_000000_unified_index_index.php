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

return [
    'up' => function (Builder $schema) {
        $schema->table('users', function (Blueprint $table) {
            $table->index('unified_index_with_byobu');
        });
    },
    'down' => function (Builder $schema) {
        // If migration 2021_04_21_000000_drop_users_unified_index_column has already been applied,
        // the column (and its index) no longer exist — skip gracefully.
        if (!$schema->hasIndex('users', ['unified_index_with_byobu'])) {
            return;
        }

        $schema->table('users', function (Blueprint $table) {
            $table->dropIndex(['unified_index_with_byobu']);
        });
    },
];
