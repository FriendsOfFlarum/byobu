<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Posts;

use Carbon\Carbon;
use Flarum\Post\AbstractEventPost;
use Flarum\Post\MergeableInterface;
use Flarum\Post\Post;
use FoF\Byobu\Events\AbstractRecipientsEvent;

/**
 * @property array $content
 */
class RecipientLeft extends AbstractEventPost implements MergeableInterface
{
    /**
     * {@inheritdoc}
     */
    public static $type = 'recipientLeft';

    /**
     * @param Post|null|RecipientLeft $previous
     *
     * @return $this|RecipientLeft|Post
     */
    public function saveAfter(Post $previous = null)
    {
        /** @var RecipientLeft $previous */
        if ($previous instanceof static) {
            // .. @todo
        }

        $this->save();

        return $this;
    }

    /**
     * Create a new instance in reply to a discussion.
     *
     * @param AbstractRecipientsEvent $event
     *
     * @return static
     */
    public static function reply(AbstractRecipientsEvent $event)
    {
        $post = new static();

        $post->content = [];
        $post->created_at = Carbon::now();
        $post->discussion_id = $event->discussion->id;
        $post->user_id = $event->actor->id;

        return $post;
    }
}
