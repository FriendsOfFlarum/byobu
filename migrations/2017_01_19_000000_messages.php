<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function(Builder $schema) {
        $schema->create('flagrow_messages', function(Blueprint $table) {
            $table->bigIncrements('id');
            $table->longText('content');
            $table->integer('to_id')->unsigned();
            $table->integer('from_id')->unsigned();
            $table->timestamps();
            $table->timestamp('read_at')->nullable();
        });
    },
    'down' => function(Builder $schema) {
        $schema->drop('flagrow_messages');
    }
];
