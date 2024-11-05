<?php

namespace Database\Seeders;

use App\Models\Meta;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MetaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // create function user meta
        $key_fonction = '@USER_FUNCTION';


        Meta::create([
            'key' => $key_fonction,
            'value' => 'Promoteur immobilier',
            'description' => 'Promoteur immobilier',
        ]);

        Meta::create([
            'key' => $key_fonction,
            'value' => 'Propriétaire du bien',
            'description' => 'Propriétaire du bien',
        ]);

        Meta::create([
            'key' => $key_fonction,
            'value' => 'Entreprise immobilière',
            'description' => 'Entreprise immobilière',
        ]);

        Meta::create([
            'key' => $key_fonction,
            'value' => 'Particulier',
            'description' => 'Particulier',
        ]);
    }
}
