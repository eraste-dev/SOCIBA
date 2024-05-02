<?php

namespace Database\Seeders;

use Database\Factories\PropertyFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PropertySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (!defined('POST_TYPE')) {
            define('POST_TYPE', [
                'PROPERTY'   => 'PROPERTY',
                'BLOG'       => 'BLOG',
            ]);
        }
        PropertyFactory::new()->count(100)->create();
    }
}
