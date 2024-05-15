<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            SliderSeeder::class,

            PropertyCategorySeeder::class,
            PropertySeeder::class,
            PropertyImagesSeeder::class,

            CountrySeeder::class,
            CitySeeder::class,
            MunicipalitySeeder::class,
        ]);
    }
}
