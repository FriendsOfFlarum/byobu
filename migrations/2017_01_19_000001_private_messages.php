<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function(Builder $schema) {
        $schema->create('flagrow_private_messages', function(Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('discussion_id')->unsigned();
            $table->integer('author_id')->unsigned();
            $table->longText('message');
            $table->timestamps();
        });
    },
    'down' => function(Builder $schema) {
        $schema->drop('flagrow_private_messages');
    }
];
