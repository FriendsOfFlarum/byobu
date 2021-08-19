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

class DiscussionDataAttributes
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
        $screener = resolve(Screener::class);

        $attributes['isPrivateDiscussion'] = $screener->fromDiscussion($model)->isPrivate();

        return $attributes;
    }
}
