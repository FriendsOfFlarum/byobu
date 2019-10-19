<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Events;

use Flarum\Discussion\Discussion;
use Flarum\Group\Group;
use Flarum\User\User;
use Illuminate\Support\Collection;

abstract class AbstractRecipientsEvent
{
    /**
     * @var Discussion
     */
    public $discussion;

    /**
     * @var User
     */
    public $actor;

    /**
     * @var Collection|int[]
     */
    public $newUsers;
    /**
     * @var Collection|int[]
     */
    public $newGroups;
    /**
     * @var User[]|Collection
     */
    public $oldUsers;
    /**
     * @var Group[]|Collection
     */
    public $oldGroups;

    /**
     * AbstractRecipientsEvent constructor.
     *
     * @param Discussion         $discussion
     * @param User               $actor
     * @param Collection|int[]   $newUsers
     * @param Collection|int[]   $newGroups
     * @param Collection|User[]  $oldUsers
     * @param Collection|Group[] $oldGroups
     */
    public function __construct(Discussion $discussion, User $actor, Collection $newUsers, Collection $newGroups, Collection $oldUsers, Collection $oldGroups)
    {
        $this->discussion = $discussion;
        $this->actor = $actor;
        $this->newUsers = $newUsers;
        $this->newGroups = $newGroups;
        $this->oldUsers = $oldUsers;
        $this->oldGroups = $oldGroups;
    }
}
