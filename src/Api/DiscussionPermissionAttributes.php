<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Api;

use Flarum\Api\Serializer\DiscussionSerializer;
use Flarum\Discussion\Discussion;
use FoF\Byobu\Discussion\Screener;

class DiscussionPermissionAttributes
{
    public function __construct(protected Screener $screener)
    {
    }

    public function __invoke(DiscussionSerializer $serializer, Discussion $model, array $attributes): array
    {
        $actor = $serializer->getActor();
        $users = $actor->can('editUserRecipients', $model);
        $groups = $actor->can('editGroupRecipients', $model);

        $attributes['canEditRecipients'] = $model->is_private && ($users || $groups);
        $attributes['canEditUserRecipients'] = $users;
        $attributes['canEditGroupRecipients'] = $groups;

        if ($this->screener->fromDiscussion($model)->isPrivate()) {
            $attributes['canMakePublic'] = $actor->can('transformToPublic', $model);
        }

        return $attributes;
    }
}
