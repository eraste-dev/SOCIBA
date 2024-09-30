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
            'value' => 'Agent immobilier',
            'description' => 'Agent immobilier',
        ]);

        Meta::create([
            'key' => $key_fonction,
            'value' => 'Démarcheur immobilier',
            'description' => 'Démarcheur immobilier',
        ]);

        Meta::create([
            'key' => $key_fonction,
            'value' => 'Particulier',
            'description' => '',
        ]);

        Meta::create([
            'key' => $key_fonction,
            'value' => 'Entreprise',
            'description' => 'Professionnel',
        ]);
    }
}
