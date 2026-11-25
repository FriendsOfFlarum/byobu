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

        $text = 'Private discussions are discussions with recipients: isPrivateDiscussion is true, and recipientUsers and recipientGroups say who can read them. '
            .'Never quote or reveal a private discussion\'s content anywhere else. search_discussions with private: true lists yours.';

        $withUsers = $actor->can('discussion.startPrivateDiscussionWithUsers');
        $withGroups = $actor->can('discussion.startPrivateDiscussionWithGroups');

        if ($withUsers || $withGroups) {
            $arguments = array_filter([$withUsers ? 'recipients (usernames)' : null, $withGroups ? 'recipientGroups (group IDs)' : null]);
            $text .= ' Start one: start_discussion with '.implode(' and/or ', $arguments).'; without them the discussion is public.';
        }

        $text .= ' Where a discussion\'s canEditRecipients allows, update_resource with relationships recipientUsers and recipientGroups changes them, listing every recipient to keep. '
            .'Anyone added can read the whole discussion: confirm with the user first.';

        if ($this->extensions->isEnabled('flarum-messages')) {
            $text .= ' Conversations (send_message) are a separate feature: when the user asks for a private message, ask which they mean.';
        }

        return $text;
    }
}
