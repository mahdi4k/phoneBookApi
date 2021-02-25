<?php

namespace Tests\Feature;

use App\Audience;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AudienceTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_getting_all_audience()
    {
        $user = factory(User::class)->create();

        $response = $this->actingAs($user, 'api')
            ->json('GET', '/api/v1/Audience');

        $response->assertStatus(200);

    }

    public function test_can_create_audience()
    {
        $this->withoutExceptionHandling();
        $user = factory(User::class)->create();
        Storage::fake('avatars');

        $file = UploadedFile::fake()->image('avatar.jpg');
        $this->actingAs($user, 'api');
        $formData = [
            'name' => 'john',
            'status' => 1,
            'phoneNumber' => '09351510925',
            'email' => 'ali@yahoo.com',
            'image' => $file,
            'user_id' => 1,
            'category_id' => 1

        ];
        $this->json('POST', '/api/v1/Audience', $formData)
            ->assertStatus(200);

    }

    public function test_can_update_audience()
    {
        $this->withoutExceptionHandling();
        $user = factory(User::class)->create();
         Storage::fake('avatars');

        $file = UploadedFile::fake()->image('myAvatar.jpg');
        $this->actingAs($user, 'api');
        $formData = [
            'name' => 'john',
            'status' => 1,
            'phoneNumber' => '09351510925',
            'email' => 'ali@yahoo.com',
            'image' => $file,
            'user_id' => 1,
            'category_id' => 1


        ];
        $this->json('PUT', '/api/v1/Audience/update/1' , $formData)->assertStatus(200);
    }

    public function test_can_delete_audience()
    {
        $this->withoutExceptionHandling();
        $user = factory(User::class)->create();
        $this->actingAs($user, 'api');

        $this->json('delete', '/api/v1/Audience/delete/1')->assertStatus(200);
    }
}
