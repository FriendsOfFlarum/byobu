<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) 2019 - 2021 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Api;

use Flarum\Api\Serializer\DiscussionSerializer;
use Flarum\Discussion\Discussion;

class DiscussionPermissionAttributes
{
    /**
     * @param Flarum\Api\Serializer\UserSerializer $serializer
     * @param Flarum\Discussion\Discussion         $discussion
     * @param array                                $attributes
     *
     * @return mixed
     */
    public function __invoke(DiscussionSerializer $serializer, Discussion $model, array $attributes)
    {
        $actor = $serializer->getActor();
        $users = $actor->can('editUserRecipients', $model);
        $groups = $actor->can('editGroupRecipients', $model);

        $attributes['canEditRecipients'] = $users || $groups;
        $attributes['canEditUserRecipients'] = $users;
        $attributes['canEditGroupRecipients'] = $groups;

        return $attributes;
    }
}
