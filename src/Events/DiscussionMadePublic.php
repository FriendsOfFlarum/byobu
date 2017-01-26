<?php

namespace Flagrow\Byobu\Events;

use Flarum\Core\Discussion;
use Flarum\Core\User;
use Illuminate\Database\Eloquent\Collection;

class DiscussionMadePublic
{
    public $discussion;

    public $actor;

    public $oldRecipients;

    public function __construct(Discussion $discussion, User $actor, Collection $oldRecipients)
    {
        $this->discussion = $discussion;
        $this->actor = $actor;
        $this->oldRecipients = $oldRecipients;
    }
}
