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

use Flarum\Api\Context;
use Flarum\Discussion\Discussion;
use Flarum\Notification\Notification;
use Flarum\Post\Post;
use Illuminate\Database\Eloquent\Collection;

/**
 * Loads the recipients of the private discussions a page of notifications is
 * about, for the whole page.
 *
 * Each serialised discussion asks whether it is private, and a private one
 * needs its recipients to answer (see Screener::isPrivateDiscussion). The
 * subject is polymorphic, so they can't be named in an eager load path, and
 * core's eagerLoadWhere('subject') can't be added to: a second one would
 * replace it. This runs after core has loaded the subjects.
 */
class LoadNotificationSubjectRecipients
{
    /**
     * @param array{models: Notification[]} $results
     */
    public function __invoke(Context $context, array $results): void
    {
        $discussions = [];

        foreach ($results['models'] as $notification) {
            $subject = $notification->relationLoaded('subject') ? $notification->subject : null;

            if ($subject instanceof Post && $subject->relationLoaded('discussion')) {
                $subject = $subject->discussion;
            }

            if ($subject instanceof Discussion && $subject->is_private) {
                $discussions[spl_object_id($subject)] = $subject;
            }
        }

        (new Collection(array_values($discussions)))->loadMissing('activeRecipients');
    }
}
