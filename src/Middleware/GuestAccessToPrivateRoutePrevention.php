<?php

/*
 * This file is part of fof/byobu.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Byobu\Middleware;

use Flarum\Http\RequestUtil;
use Laminas\Diactoros\Response\RedirectResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

class GuestAccessToPrivateRoutePrevention implements MiddlewareInterface
{
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $actor = RequestUtil::getActor($request);

        // if actor is guest, and the route is `/private`, redirect to homepage
        if ($actor->isGuest() && $request->getUri()->getPath() === '/private') {
            return new RedirectResponse('/', 302);
        }

        return $handler->handle($request);
    }
}
