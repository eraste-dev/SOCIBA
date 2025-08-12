<?php

namespace App\Console\Commands;

use App\Models\Slider;
use Illuminate\Console\Command;

class UpdateSliderData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'slider:update-data';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Met à jour les données des sliders avec les bonnes valeurs d\'image et de place';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Mise à jour des données des sliders...');

        // Mettre à jour les sliders spécifiques avec les bonnes données
        $slidersToUpdate = [
            ['id' => 40, 'place' => 'HOME', 'image' => '/images/sliders/40__1747350105__image.jpeg'],
            ['id' => 41, 'place' => 'HOME', 'image' => '/images/sliders/41__1747350158__image.jpeg'],
            ['id' => 42, 'place' => 'HOME', 'image' => '/images/sliders/42__1747350194__image.jpeg'],
            ['id' => 37, 'place' => 'MOVING', 'image' => '/images/sliders/37__1732988076__image.png'],
            // Ajouter d'autres images disponibles pour les sliders HOME
            ['id' => 7, 'place' => 'HOME', 'image' => '/images/sliders/s1.jpeg'],
            ['id' => 8, 'place' => 'HOME', 'image' => '/images/sliders/s2.jpeg'],
            ['id' => 9, 'place' => 'HOME', 'image' => '/images/sliders/s3.jpeg'],
            ['id' => 10, 'place' => 'HOME', 'image' => '/images/sliders/s4.jpeg'],
            ['id' => 11, 'place' => 'HOME', 'image' => '/images/sliders/s5.jpeg'],
            ['id' => 12, 'place' => 'HOME', 'image' => '/images/sliders/01.png'],
            ['id' => 13, 'place' => 'HOME', 'image' => '/images/sliders/02.png'],
        ];

        foreach ($slidersToUpdate as $sliderData) {
            $slider = Slider::find($sliderData['id']);
            if ($slider) {
                $slider->update([
                    'place' => $sliderData['place'],
                    'image' => $sliderData['image']
                ]);
                $this->info("Slider ID {$sliderData['id']} mis à jour avec place={$sliderData['place']} et image={$sliderData['image']}");
            } else {
                $this->warn("Slider ID {$sliderData['id']} non trouvé");
            }
        }

        // Mettre à jour les sliders sans place pour les définir comme HOME par défaut
        $slidersWithoutPlace = Slider::whereNull('place')->get();
        foreach ($slidersWithoutPlace as $slider) {
            $slider->update(['place' => 'HOME']);
            $this->info("Slider ID {$slider->id} mis à jour avec place=HOME");
        }

        $this->info('Mise à jour terminée!');
        
        // Afficher le résumé
        $homeSliders = Slider::where('place', 'HOME')->count();
        $movingSliders = Slider::where('place', 'MOVING')->count();
        $productSliders = Slider::where('place', 'PRODUCT')->count();
        $homeSlidersWithImages = Slider::where('place', 'HOME')->whereNotNull('image')->count();
        
        $this->table(
            ['Place', 'Nombre', 'Avec images'],
            [
                ['HOME', $homeSliders, $homeSlidersWithImages],
                ['MOVING', $movingSliders, Slider::where('place', 'MOVING')->whereNotNull('image')->count()],
                ['PRODUCT', $productSliders, Slider::where('place', 'PRODUCT')->whereNotNull('image')->count()]
            ]
        );

        return Command::SUCCESS;
    }
}
