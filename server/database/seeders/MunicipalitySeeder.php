<?php

namespace Database\Seeders;

use App\Models\Municipality;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MunicipalitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $municipalities = [
            [
                'name' => 'Abobo',
                'slug' => 'abobo',
                'city_id' => 1,
                'iso3' => '',
                'iso2' => '',
                'description' => '',
                'lat' => '',
                'long' => '',
                'thumbnail' => '',
            ],
            [
                'name' => 'Adjamé',
                'slug' => 'adjame',
                'city_id' => 1,
                'iso3' => '',
                'iso2' => '',
                'description' => '',
                'lat' => '',
                'long' => '',
                'thumbnail' => '',
            ],
            [
                'name' => 'Anyama',
                'slug' => 'anyama',
                'city_id' => 1,
                'iso3' => '',
                'iso2' => '',
                'description' => '',
                'lat' => '',
                'long' => '',
                'thumbnail' => '',
            ],
            [
                'name' => 'Attécoubé',
                'slug' => 'attecoube',
                'city_id' => 1,
                'iso3' => '',
                'iso2' => '',
                'description' => '',
                'lat' => '',
                'long' => '',
                'thumbnail' => '',
            ],
            [
                'name' => 'Bingerville',
                'slug' => 'bingerville',
                'city_id' => 1,
                'iso3' => '',
                'iso2' => '',
                'description' => '',
                'lat' => '',
                'long' => '',
                'thumbnail' => '',
            ],
            [
                'name' => 'Cocody',
                'slug' => 'cocody',
                'city_id' => 1,
                'iso3' => '',
                'iso2' => '',
                'description' => '',
                'lat' => '',
                'long' => '',
                'thumbnail' => '',
            ],
            [
                'name' => 'Kouamassi',
                'slug' => 'kouamassi',
                'city_id' => 1,
                'iso3' => '',
                'iso2' => '',
                'description' => '',
                'lat' => '',
                'long' => '',
                'thumbnail' => '',
            ],
            [
                'name' => 'Macory',
                'slug' => 'macory',
                'city_id' => 1,
                'iso3' => '',
                'iso2' => '',
                'description' => '',
                'lat' => '',
                'long' => '',
                'thumbnail' => '',
            ],
            [
                'name' => 'Plateau',
                'slug' => 'plateau',
                'city_id' => 1,
                'iso3' => '',
                'iso2' => '',
                'description' => '',
                'lat' => '',
                'long' => '',
                'thumbnail' => '',
            ],
            [
                'name' => 'Port-bouët',
                'slug' => 'ort-bouet',
                'city_id' => 1,
                'iso3' => '',
                'iso2' => '',
                'description' => '',
                'lat' => '',
                'long' => '',
                'thumbnail' => '',
            ],
            [
                'name' => 'Treichville',
                'slug' => 'treichville',
                'city_id' => 1,
                'iso3' => '',
                'iso2' => '',
                'description' => '',
                'lat' => '',
                'long' => '',
                'thumbnail' => '',
            ],
            [
                'name' => 'Songon',
                'slug' => 'songon',
                'city_id' => 1,
                'iso3' => '',
                'iso2' => '',
                'description' => '',
                'lat' => '',
                'long' => '',
                'thumbnail' => '',
            ],
            [
                'name' => 'Yopougon',
                'slug' => 'yopougon',
                'city_id' => 1,
                'iso3' => '',
                'iso2' => '',
                'description' => '',
                'lat' => '',
                'long' => '',
                'thumbnail' => '',
            ],
        ];

        foreach ($municipalities as $municipality) {
            Municipality::create($municipality);
        }
    }
}
