<?php

namespace FoF\Byobu\Content;

use Flarum\Forum\Content\Index;
use Flarum\Frontend\Document;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface as Request;

class PrivateDiscussionsPage extends Index
{
    public function __invoke(Document $document, Request $request)
    {
        $queryParams = $request->getQueryParams();
        $q = Arr::pull($queryParams, 'q', '');
        Arr::set($queryParams, 'q', "$q is:private");

        $request = $request->withQueryParams($queryParams);

        return parent::__invoke($document, $request);
    }
}
