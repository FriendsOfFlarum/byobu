<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Tests\integration\api;

/**
 * Runs all private discussion creation tests without flarum/tags active.
 */
class CreatePrivateDiscussionTest extends AbstractCreatePrivateDiscussionTest
{
    // All shared tests are inherited from AbstractCreatePrivateDiscussionTest.
    // No tags extension is loaded, so tag-related behaviour is not exercised here.
}
