<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Country::create([
            'name' => 'Côte d’Ivoire',
            'slug' => 'cote-d-ivoire',
            'iso3' => 'CIV',
            'iso2' => 'CI',
            'phone_code' => '225',
            'capital' => 'Abidjan',
            'currency' => 'XOF',
            'currency_name' => 'FCFA',
            'currency_symbol' => 'FCFA',
            'timezones' => 'Africa/Cairo',
            'translations' => '{}',
            'lat' => '7.539989',
            'long' => '-5.547080',
        ]);
    }
}
