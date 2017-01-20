<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function(Builder $schema) {
        $schema->create('flagrow_private_discussions', function(Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
        });
    },
    'down' => function(Builder $schema) {
        $schema->drop('flagrow_private_discussions');
    }
];
