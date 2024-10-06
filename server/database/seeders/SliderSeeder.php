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
            // 'image' => '/images/sliders/01.png',
            'image' => '/images/sliders/s1.jpeg',
            'place' => 'HOME',
        ]);

        Slider::create([
            'title' => 'Deuxième slider',
            'description' => '',
            // 'image' => '/images/sliders/02.png',
            'image' => '/images/sliders/s2.jpeg',
            'place' => 'HOME',
        ]);

        Slider::create([
            'title' => 'Deuxième slider',
            'description' => '',
            // 'image' => '/images/sliders/03.png',
            'image' => '/images/sliders/s3.jpeg',
            'place' => 'HOME',
        ]);

        Slider::create([
            'title' => 'Deuxième - alt slider',
            'description' => '',
            // 'image' => '/images/sliders/03.png',
            'image' => '/images/sliders/s4.jpeg',
            'place' => 'HOME',
        ]);
        Slider::create([
            'title' => 'Deuxième - alt slider',
            'description' => '',
            // 'image' => '/images/sliders/03.png',
            'image' => '/images/sliders/s5.jpeg',
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
