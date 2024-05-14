<?php

namespace Database\Seeders;

use App\Models\PropertyCategory;
use Database\Factories\PropertyCategoryFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PropertyCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Catégories principales
        $categories = [
            [
                'name' => 'Maison', 'slug' => 'maison', 'icon' => '', 'description' => ''
            ],
            [
                'name' => 'Magasin', 'slug' => 'magasin', 'icon' => '', 'description' => ''
            ],
            [
                'name' => 'Entrepot', 'slug' => 'entrepot', 'icon' => '', 'description' => ''
            ],
            ['name' => 'Location', 'slug' => 'location', 'icon' => '', 'description' => ''],
            ['name' => '', 'slug' => '', 'icon' => '', 'description' => ''],
        ];

        // Insérer les catégories principales
        foreach ($categories as $categoryData) {
            $category = PropertyCategory::create([
                'name' => $categoryData['name'],
                'slug' => $categoryData['slug'],
            ]);

            // Sous-catégories pour la catégorie principale "Maison"
            if ($category->name === 'Maison') {
                $subCategories = [
                    ['name' => 'Studio', 'slug' => 'studio',],
                    ['name' => 'Chambre', 'slug' => 'chambre',],
                    ['name' => 'Chambre salon', 'slug' => 'chambre-salon',],
                    ['name' => '2 Chambres salon', 'slug' => '2-chambre-salon',],
                    ['name' => 'Villa', 'slug' => 'villa',],
                    ['name' => 'Duplex', 'slug' => 'duplex',],
                    ['name' => 'Triplex', 'slug' => 'triplex',],
                ];

                foreach ($subCategories as $subCategoryData) {
                    $category->children()->create([
                        'name' => $subCategoryData['name'],
                        'slug' => $subCategoryData['slug'],
                    ]);
                }
            }

            if ($category->name === 'Entrepot') {
                $subCategories = [
                    ['name' => 'Espace à louer', 'slug' => 'espace-a-louer',],
                    ['name' => 'Autres', 'slug' => 'autres',],
                ];

                foreach ($subCategories as $subCategoryData) {
                    $category->children()->create([
                        'name' => $subCategoryData['name'],
                        'slug' => $subCategoryData['slug'],
                    ]);
                }
            }
        }
    }
}
