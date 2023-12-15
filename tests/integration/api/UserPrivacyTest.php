<?php

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
            ]
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
                    'json' => [
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
}
