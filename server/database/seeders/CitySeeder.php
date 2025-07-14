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

        City::create([
            'name' => 'Yamoussoukro',
            'slug' => 'yamoussoukro',
            'iso3' => 'civ',
            'iso2' => 'ci',
            'description' => 'Capitale politique de la Côte d\'Ivoire',
            'country_id' => 1,
            'lat' => 6.82,
            'long' => -5.28,
            'thumbnail' => '',
        ]);

        City::create([
            'name' => 'San-Pedro',
            'slug' => 'san-pedro',
            'iso3' => 'civ',
            'iso2' => 'ci',
            'description' => 'Port autonome de San-Pedro',
            'country_id' => 1,
            'lat' => 4.75,
            'long' => -6.63,
            'thumbnail' => '',
        ]);
    }
}
