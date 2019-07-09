<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->table('users', function (Blueprint $table) {
            $table->index('blocks_byobu_pd');
        });
    },
    'down' => function (Builder $schema) {
        $schema->table('users', function (Blueprint $table) {
            $table->dropIndex('blocks_byobu_pd');
        });
    },
];
