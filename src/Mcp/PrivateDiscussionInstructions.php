<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Mcp;

use Flarum\Extension\ExtensionManager;
use Flarum\Mcp\Capability\McpContext;

class PrivateDiscussionInstructions
{
    public function __construct(
        protected ExtensionManager $extensions
    ) {
    }

    public function __invoke(McpContext $context): ?string
    {
        $actor = $context->actor;

        if ($actor->isGuest()) {
            return null;
        }

        // Kept short: flarum/mcp drops whole notes that don't fit its server instructions.
        $text = 'Never reveal a private discussion\'s content outside it. search_discussions and read_discussion don\'t say which are private: '
            .'check isPrivateDiscussion with get_resource first. search_discussions with private: true lists yours.';

        if ($this->extensions->isEnabled('flarum-messages')) {
            $text .= ' They are not conversations (send_message).';
        }

        return $text;
    }
}
