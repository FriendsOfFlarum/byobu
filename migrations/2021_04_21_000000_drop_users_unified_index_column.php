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
        $schema->table('users', function (Blueprint $table) use ($schema) {
            // Drop the index first before dropping the column
            if ($schema->hasColumn('users', 'unified_index_with_byobu')) {
                // Drop index by array syntax (Laravel automatically finds the correct index name)
                try {
                    $table->dropIndex(['unified_index_with_byobu']);
                } catch (\Exception $e) {
                    // Index might not exist, that's okay
                }

                $table->dropColumn('unified_index_with_byobu');
            }
        });
    },
    'down' => function (Builder $schema) {
        $schema->table('users', function (Blueprint $table) {
            $table->boolean('unified_index_with_byobu')->default(false);
            $table->index('unified_index_with_byobu');
        });
    },
];
