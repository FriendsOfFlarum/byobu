<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->getConnection()
            ->query()
            ->from('settings')
            ->where('key', 'fof-byobu.enable_byobu_user_page')
            ->delete();
    },

    'down' => function (Builder $schema) {
        // erm, no
    },
];
