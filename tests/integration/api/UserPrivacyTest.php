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

use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;

class UserPrivacyTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    public function setUp(): void
    {
        parent::setUp();

        $this->extension('fof-byobu');

        $this->prepareDatabase([
            'users' => [
                $this->normalUser(),
                ['id' => 3, 'username' => 'normal2', 'email' => 'normal2@machine.local', 'password' => 'too-obscure', 'blocks_byobu_pd' => true],
            ],
        ]);
    }

    /**
     * @test
     */
    public function user_can_set_block_pd_setting()
    {
        $response = $this->send(
            $this->request(
                'PATCH',
                '/api/users/2',
                [
                    'authenticatedAs' => 2,
                    'json'            => [
                        'data' => [
                            'attributes' => [
                                'blocksPd' => true,
                            ],
                        ],
                    ],
                ]
            )
        );

        $this->assertEquals(200, $response->getStatusCode());

        $json = json_decode($response->getBody()->getContents(), true);

        $this->assertTrue($json['data']['attributes']['blocksPd']);
    }

    /**
     * @test
     */
    public function user_can_disable_block_pd_setting()
    {
        $response = $this->send(
            $this->request(
                'PATCH',
                '/api/users/3',
                [
                    'authenticatedAs' => 3,
                    'json'            => [
                        'data' => [
                            'attributes' => [
                                'blocksPd' => false,
                            ],
                        ],
                    ],
                ]
            )
        );

        $this->assertEquals(200, $response->getStatusCode());

        $json = json_decode($response->getBody()->getContents(), true);

        $this->assertFalse($json['data']['attributes']['blocksPd']);
    }
}
