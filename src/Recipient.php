<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu;

use Carbon\Carbon;
use Flarum\Database\AbstractModel;

/**
 * A user or group a private discussion is addressed to.
 *
 * @property int         $id
 * @property int         $discussion_id
 * @property int|null    $user_id
 * @property int|null    $group_id
 * @property Carbon|null $removed_at
 */
class Recipient extends AbstractModel
{
    protected $table = 'recipients';

    protected $casts = [
        'removed_at' => 'datetime',
    ];
}
