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
                'name' => 'Maison',
                'slug' => 'maison',
                'icon' => 'fa fa-envelope',
                'description' => ''
            ],
            [
                'name' => 'Appartement',
                'slug' => 'appartement',
                'icon' => 'fa fa-envelope',
                'description' => ''
            ],
            [
                'name' => 'Hôtel',
                'slug' => 'hotel',
                'icon' => 'fa fa-envelope',
                'description' => ''
            ],
            [
                'name' => 'Service',
                'slug' => 'Service',
                'icon' => 'fa fa-envelope',
                'description' => ''
            ],
            [
                'name' => 'Terrain',
                'slug' => 'Terrain',
                'icon' => 'fa fa-envelope',
                'description' => ''
            ],
            [
                'name' => 'Résidence',
                'slug' => 'Résidence',
                'icon' => 'fa fa-envelope',
                'description' => ''
            ],
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
                    [
                        'name' => 'Villa',
                        'slug' => 'villa',
                    ],
                    [
                        'name' => 'Maison de ville',
                        'slug' => 'maison-de-ville',
                    ],
                    // Ajoutez d'autres sous-catégories si nécessaire
                ];

                foreach ($subCategories as $subCategoryData) {
                    $category->children()->create([
                        'name' => $subCategoryData['name'],
                        'slug' => $subCategoryData['slug'],
                    ]);
                }
            }
        }

        PropertyCategoryFactory::new()->count(150)->create();
    }
}
