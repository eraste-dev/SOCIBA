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
        Slider::create([
            'title' => 'Premier slider',
            'description' => 'Description du premier slider',
            'image' => '/images/sliders/01.png',
            'place' => 'HOME',
        ]);

        Slider::create([
            'title' => 'Deuxième slider',
            'description' => '',
            'image' => '/images/sliders/02.png',
            'place' => 'HOME',
        ]);

        Slider::create([
            'title' => 'Deuxième slider',
            'description' => '',
            'image' => '/images/sliders/03.png',
            'place' => 'HOME',
        ]);

        Slider::create([
            'title' => 'Deuxième slider',
            'description' => '',
            'image' => '/images/sliders/04.png',
            'place' => 'MOVING',
        ]);
    }
}
