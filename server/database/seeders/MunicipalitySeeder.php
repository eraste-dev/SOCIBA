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
                'name' => 'Cocody',
                'slug' => 'cocody',
                'city_id' => 1,
                'iso3' => '',
                'iso2' => '',
                'description' => 'Commune de Cocody',
                'lat' => '5.327800',
                'long' => '-3.989800',
                'thumbnail' => '/images/municipalities/cocody.jpeg',
                'popularity_rate' => 100
            ],
            [
                'name' => 'Plateau',
                'slug' => 'plateau',
                'city_id' => 1,
                'iso3' => '',
                'iso2' => '',
                'description' => 'Commune du Plateau',
                'lat' => '5.322500',
                'long' => '-4.020900',
                'thumbnail' => '/images/municipalities/plateau.jpeg',
                'popularity_rate' => 99
            ],
            [
                'name' => 'Treichville',
                'slug' => 'treichville',
                'city_id' => 1,
                'iso3' => '',
                'iso2' => '',
                'description' => 'Commune de Treichville',
                'lat' => '5.300000',
                'long' => '-4.000000',
                'thumbnail' => '/images/municipalities/treichville.jpeg',
                'popularity_rate' =>  98
            ],
            [
                'name' => 'Kouamassi',
                'slug' => 'kouamassi',
                'city_id' => 1,
                'iso3' => '',
                'iso2' => '',
                'description' => 'Commune de Kouamassi',
                'lat' => '5.295000',
                'long' => '-3.975000',
                'thumbnail' => '/images/municipalities/kouamassi.jpeg',
                'popularity_rate' =>  97
            ],
            [
                'name' => 'Macory',
                'slug' => 'macory',
                'city_id' => 1,
                'iso3' => '',
                'iso2' => '',
                'description' => 'Commune de Macory',
                'lat' => '5.299000',
                'long' => '-4.012400',
                'thumbnail' => '/images/municipalities/macory.jpg',
                'popularity_rate' =>  96
            ],
            [
                'name' => 'Yopougon',
                'slug' => 'yopougon',
                'city_id' => 1,
                'iso3' => '',
                'iso2' => '',
                'description' => 'Commune de Yopougon',
                'lat' => '5.330000',
                'long' => '-4.080000',
                'thumbnail' => '/images/municipalities/0.jpg',
                'popularity_rate' =>  95
            ],
            [
                'name' => 'Port-bouët',
                'slug' => 'port-bouet',
                'city_id' => 1,
                'iso3' => '',
                'iso2' => '',
                'description' => 'Commune de Port-bouët',
                'lat' => '5.256400',
                'long' => '-3.925700',
                'thumbnail' => '/images/municipalities/port-bouet.jpg',
                'popularity_rate' =>  94
            ],
            [
                'name' => 'Bingerville',
                'slug' => 'bingerville',
                'city_id' => 1,
                'iso3' => '',
                'iso2' => '',
                'description' => 'Commune de Bingerville',
                'lat' => '5.350000',
                'long' => '-3.900000',
                'thumbnail' => '/images/municipalities/bingerville.png',
                'popularity_rate' =>  93
            ],
            [
                'name' => 'Songon',
                'slug' => 'songon',
                'city_id' => 1,
                'iso3' => '',
                'iso2' => '',
                'description' => 'Commune de Songon',
                'lat' => '5.335600',
                'long' => '-4.291800',
                'thumbnail' => '/images/municipalities/songon.jpg',
                'popularity_rate' =>  92
            ],
            [
                'name' => 'Anyama',
                'slug' => 'anyama',
                'city_id' => 1,
                'iso3' => '',
                'iso2' => '',
                'description' => 'Commune d\'Anyama',
                'lat' => '5.494800',
                'long' => '-4.051100',
                'thumbnail' => '/images/municipalities/anyama.jpeg',
                'popularity_rate' =>  2
            ],
            [
                'name' => 'Attécoubé',
                'slug' => 'attecoube',
                'city_id' => 1,
                'iso3' => '',
                'iso2' => '',
                'description' => 'Commune d\'Attécoubé',
                'lat' => '5.316100',
                'long' => '-4.045800',
                'thumbnail' => '/images/municipalities/0.jpg',
                'popularity_rate' =>  1
            ],
            [
                'name' => 'Abobo',
                'slug' => 'abobo',
                'city_id' => 1,
                'iso3' => '',
                'iso2' => '',
                'description' => 'Commune d\'Abobo',
                'lat' => '5.416667',
                'long' => '-4.016667',
                'thumbnail' => '/images/municipalities/abobo.png',
                'popularity_rate' =>  0
            ],
            [
                'name' => 'Adjamé',
                'slug' => 'adjame',
                'city_id' => 1,
                'iso3' => '',
                'iso2' => '',
                'description' => 'Commune d\'Adjamé',
                'lat' => '5.347600',
                'long' => '-4.012700',
                'thumbnail' => '/images/municipalities/adjame.jpeg',
                'popularity_rate' =>  0
            ],
        ];

        foreach ($municipalities as $municipality) {
            Municipality::create($municipality);
        }
    }
}
