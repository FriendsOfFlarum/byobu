<?php

namespace Flagrow\Byobu\Posts;

use Flarum\Core\Discussion;
use Flarum\Core\Post;
use Flarum\Core\Post\AbstractEventPost;
use Flarum\Core\Post\MergeableInterface;

class RecipientsModified extends AbstractEventPost implements MergeableInterface
{
    /**
     * {@inheritdoc}
     */
    public static $type = 'recipientsModified';

    /**
     * {@inheritdoc}
     */
    public function saveAfter(Post $previous = null)
    {
        // If the previous post is another 'discussion tagged' post, and it's
        // by the same user, then we can merge this post into it. If we find
        // that we've in fact reverted the tag changes, delete it. Otherwise,
        // update its content.
        if ($previous instanceof static) {
            if ($previous->content[0] == $this->content[1]) {
                $previous->delete();
            } else {
                $previous->content = static::buildContent($previous->content[0], $this->content[1]);
                $previous->time = $this->time;

                $previous->save();
            }

            return $previous;
        }

        $this->save();

        return $this;
    }

    /**
     * Create a new instance in reply to a discussion.
     *
     * @param Discussion $discussion
     * @param int $userId
     * @param array $oldRecipientUsers
     * @param array $oldRecipientGroups
     * @return static
     */
    public static function reply(Discussion $discussion, $userId, array $oldRecipientUsers, array $oldRecipientGroups)
    {
        $post = new static;

        $post->content = [
            'users' => $oldRecipientUsers,
            'groups' => $oldRecipientGroups
        ];
        $post->time = time();
        $post->discussion_id = $discussion->id;
        $post->user_id = $userId;

        return $post;
    }
}
