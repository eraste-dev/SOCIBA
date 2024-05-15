<?php

namespace Database\Seeders;

use Database\Factories\PropertyImagesFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PropertyImagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PropertyImagesFactory::new()->count(500)->create();
    }
}
