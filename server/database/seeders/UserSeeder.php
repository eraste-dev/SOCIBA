<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserMeta;
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
        // create default user function


        User::create([
            'name'              => 'Paĉome',
            'last_name'          => 'Djé',
            'email'             => 'admin@sociba.com',
            'email_verified_at' => now(),
            'password'          => Hash::make('password'),
            'phone'             => '0789670552',
            'phone_whatsapp'    => '0789670552',
            'avatar'            => '/images/users/avatars/logo-sociba-400xauto.png',
            'remember_token'    => null,
            'type'              => 'ADMIN',
            'fonction'          => 'Agent immobilier',
            'status' => 'ACTIVE'
        ]);

        User::create([
            'name'              => 'E',
            'last_name'          => 'Kouakou',
            'email'             => 'keraste38@gmail.com',
            'phone'             => '0789670552',
            'phone_whatsapp'    => '0153220218',
            'avatar'            => '/images/users/avatars/keraste38.jpg',
            'email_verified_at' => now(),
            'password'          => Hash::make('password'),
            'remember_token'    => null,
            'type'              => 'USER',
            'fonction'          => 'Démarcheur immobilier',
            'status' => 'ACTIVE'
        ]);
    }
}
