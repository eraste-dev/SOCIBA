<?php

namespace Database\Seeders;

use App\Models\City;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        City::create([
            'name' => 'Abidjan',
            'slug' => 'abidjan',
            'iso3' => 'civ',
            'iso2' => 'ci',
            'description' => '',
            'country_id' => 1,
            'lat' => 5.32,
            'long' => -3.93,
            'thumbnail' => '',
        ]);
    }
}
