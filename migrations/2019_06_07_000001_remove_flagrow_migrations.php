<?php

use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->getConnection()->table('migrations')->whereExtension('flagrow-byobu')->delete();
    },
    'down' => function (Builder $schema) {
        // .. bugger off
    },
];
