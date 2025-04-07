<?php

namespace FoF\Byobu\Tests\integration\forum;

use Flarum\Extend;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Psr\Http\Message\ResponseInterface;

class VisibilityTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    public function setUp(): void
    {
        parent::setUp();

        $this->extend(
            (new Extend\Csrf)->exemptRoute('login')
        );

        $this->extension('fof-byobu');

        $this->prepareDatabase([
            'users' => [
                $this->normalUser()
            ]
        ]);
    }

    public function login(string $username, string $password): ResponseInterface
    {
        return $this->send(
            $this->request('POST', '/login', [
                'json' => [
                    'identification' => $username,
                    'password' => $password
                ]
            ])
        );
    }

    /** @test */
    public function guestUserEncountersRedirectsToHomeWhenVisitingPrivateDiscussionsPage()
    {
        $response = $this->send(
            $this->request('GET', '/private')
        );

        $this->assertEquals(302, $response->getStatusCode());
        $this->assertEquals('/', $response->getHeaderLine('Location'));
    }

    /** @test */
    public function normalUserCanAccessPrivateDiscussionsPage()
    {
        $login = $this->login('normal', 'too-obscure');

        $this->assertEquals(200, $login->getStatusCode(), 'Login failed');

        $response = $this->send(
            $this->request('GET', '/private', [
                'cookiesFrom' => $login
            ])
        );

        $this->assertEquals(200, $response->getStatusCode());
    }
}
