<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;
use Illuminate\Support\Arr;

return [
    'up' => function (Builder $schema) {
        $db = $schema->getConnection();

        $blocks = [];

        $db->table('users')
            ->orderBy('id')
            ->whereNotNull('preferences')
            ->each(function ($user) use (&$blocks) {
                if ($blocksPd = Arr::get($user->preferences, 'blocksPd')) {
                    $blocks[] = $user->id;
                }
            });

        $schema->table('users', function (Blueprint $table) {
            $table->boolean('blocks_byobu_pd')->default(0);
        });

        $db->table('users')->whereIn('id', $blocks)->update(['blocks_byobu_pd' => 1]);
    },
    'down' => function (Builder $schema) {
        $schema->table('users', function (Blueprint $table) {
            $table->dropColumn('blocks_byobu_pd');
        });
    },
];
