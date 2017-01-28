<?php

namespace Flagrow\Byobu\Events;

use Flarum\Core\Discussion;
use Flarum\Core\User;
use Illuminate\Database\Eloquent\Collection;

abstract class AbstractRecipientsEvent
{
    public $discussion;

    public $actor;

    public $oldUsers;
    public $oldGroups;

    public function __construct(Discussion $discussion, User $actor, Collection $oldUsers, Collection $oldGroups)
    {
        $this->discussion = $discussion;
        $this->actor = $actor;
        $this->oldUsers = $oldUsers;
        $this->oldGroups = $oldGroups;
    }
}
