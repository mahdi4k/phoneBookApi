<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        factory(\App\User::class,5)->create();
        factory(\App\AudienceCategory::class,5)->create();
        factory(\App\Audience::class, 5)->create();
    }
}
