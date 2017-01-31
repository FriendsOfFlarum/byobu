<?php

namespace Flagrow\Byobu\Posts;

use Flagrow\Byobu\Events\AbstractRecipientsEvent;
use Flarum\Core\Post;
use Flarum\Core\Post\AbstractEventPost;
use Flarum\Core\Post\MergeableInterface;
use Illuminate\Support\Arr;

/**
 * @property array $content
 */
class RecipientsModified extends AbstractEventPost implements MergeableInterface
{
    /**
     * {@inheritdoc}
     */
    public static $type = 'recipientsModified';

    protected $states = ['new', 'old'];
    protected $types = ['users', 'groups'];

    /**
     * @param Post|null|RecipientsModified $previous
     * @return $this|RecipientsModified|Post
     */
    public function saveAfter(Post $previous = null)
    {
        /** @var RecipientsModified $previous */
        if ($previous instanceof static) {

            $content = [];

            foreach ($this->states as $state) {
                foreach ($this->types as $type) {
                    $values = array_merge(
                        Arr::get($previous->content, "$state.$type", []),
                        Arr::get($this->content, "$state.$type", [])
                    );

                    $values = array_unique($values);

                    if (!empty($values)) {
                        $content[$state][$type] = $values;
                    }
                }
            }

            $newContent = [];

            foreach ($this->types as $type) {
                foreach ($this->states as $state) {

                    $reverseState = collect($this->states)->filter(function($value) use ($state) {
                        return $value != $state;
                    })->first();

                    if (Arr::get($content, "$state.$type")) {
                        $newContent[$state][$type] = collect(Arr::get($content, "$state.$type", []))->filter(function($id) use ($content, $reverseState, $type) {
                            return !in_array($id, Arr::get($content, "$reverseState.$type", []));
                        })->filter()->all();

                        if (empty($newContent[$state][$type])) {
                            unset($newContent[$state]);
                        }
                    }
                }

                foreach ($this->states as $state) {
                    if (empty($newContent[$state])) {
                        unset($newContent[$state]);
                    }
                }
            }

            if (empty($newContent)) {
                $previous->delete();
            } else {
                $previous->content = $newContent;
                $previous->save();
            }

            return $previous;
        }

        $this->save();

        return $this;
    }

    /**
     * Create a new instance in reply to a discussion.
     * @param AbstractRecipientsEvent $event
     * @return static
     */
    public static function reply(AbstractRecipientsEvent $event)
    {
        $post = new static;

        $post->content = [
            'new' => [
                'users' => $event->newUsers->all(),
                'groups' => $event->newGroups->all()
            ],
            'old' => [
                'users' => $event->oldUsers->pluck('id')->all(),
                'groups' => $event->oldGroups->pluck('id')->all()
            ]
        ];
        $post->time = time();
        $post->discussion_id = $event->discussion->id;
        $post->user_id = $event->actor->id;

        return $post;
    }
}

