<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Slider;

class SliderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Créez des données de sliders de test
        Slider::create([
            'title' => 'Premier slider',
            'description' => 'Description du premier slider',
            'image' => '/images/sliders/01.png',
        ]);

        Slider::create([
            'title' => 'Deuxième slider',
            'description' => 'Description du deuxième slider',
            'image' => '/images/sliders/02.png',
        ]);

        Slider::create([
            'title' => 'Deuxième slider',
            'description' => 'Description du deuxième slider',
            'image' => '/images/sliders/03.png',
        ]);

        // Ajoutez d'autres sliders si nécessaire
    }
}
