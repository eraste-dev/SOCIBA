<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name'              => 'Admin',
            'last_name'          => '',
            'email'             => 'admin@sociba.com',
            'email_verified_at' => now(),
            'password'          => Hash::make('password'),
            'remember_token'    => null,
            'type'              => 'ADMIN', 'status' => 'ACTIVE'
        ]);


        User::factory(10)->create();
        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
