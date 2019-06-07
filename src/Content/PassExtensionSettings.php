<?php


namespace FoF\Byobu\Content;


use Flarum\Frontend\Document;

class PassExtensionSettings
{
    private $key = 'fof-byobu.enable_byobu_user_page';

    public function __invoke(Document $document)
    {
        $document->payload[$this->key] = app('flarum.settings')->get($this->key);
    }
}
