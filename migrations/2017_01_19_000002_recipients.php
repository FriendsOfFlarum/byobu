<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function(Builder $schema) {
        $schema->create('flagrow_private_recipients', function(Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('discussion_id')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->timestamp('last_message_read_at')->nullable();
        });
    },
    'down' => function(Builder $schema) {
        $schema->drop('flagrow_private_recipients');
    }
];
