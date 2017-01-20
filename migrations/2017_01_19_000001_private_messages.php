<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function(Builder $schema) {
        $schema->create('flagrow_private_messages', function(Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('discussion_id')->unsigned();
            $table->integer('author_id')->unsigned();
            $table->timestamps();

            $table
                ->foreign('discussion_id')
                ->references('id')
                ->on('flagrow_private_discussions')
                ->onDelete('cascade');

            $table
                ->foreign('author_id')
                ->references('id')
                ->on('users')
                ->onDelete('set null');
        });
    },
    'down' => function(Builder $schema) {
        $schema->drop('flagrow_private_messages');
    }
];
