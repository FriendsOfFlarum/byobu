<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu;

use Flarum\Tags\Tag;

/*
This was needed to be able to access the parent ID of the tag,
as it's protected in the normal Tag.
*/

class TagPlus extends Tag
{
    public function parentId()
    {
        return $this->attributes['parent_id'];
    }
}
