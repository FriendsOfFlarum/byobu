<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Content;

use Flarum\Frontend\Document;

class PassExtensionSettings
{
    private $key = 'fof-byobu.enable_byobu_user_page';

    public function __invoke(Document $document)
    {
        $document->payload[$this->key] = app('flarum.settings')->get($this->key);
    }
}
