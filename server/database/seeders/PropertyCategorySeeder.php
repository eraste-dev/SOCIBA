<?php

namespace Database\Seeders;

use App\Models\PropertyCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

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
                'icon' => '',
                'description' => '',
                'type' => Type::TYPE_LOCATION(),
                'uuid' => Type::makeUUID('maison', Type::TYPE_LOCATION()),
            ],
            [
                'name' => 'Magasin',
                'slug' => 'magasin',
                'icon' => '',
                'description' => '',
                'type' => Type::TYPE_LOCATION(),
                'uuid' => Type::makeUUID('Magasin', Type::TYPE_LOCATION()),
            ],
            [
                'name' => 'Entrepot',
                'slug' => 'entrepot',
                'icon' => '',
                'description' => '',
                'type' => Type::TYPE_LOCATION(),
                'uuid' => Type::makeUUID('Entrepot', Type::TYPE_LOCATION()),
            ],
            [
                'name' => 'Reservation',
                'slug' => 'reservation',
                'icon' => '',
                'description' => '',
                'type' => Type::TYPE_RESERVATION(),
                'uuid' => Type::makeUUID('Reservation', Type::TYPE_RESERVATION()),
            ],
            [
                'name' => 'Biens en vente',
                'slug' => 'biens-en-vente',
                'icon' => '',
                'description' => '',
                'type' => Type::TYPE_BIEN_EN_VENTE(),
                'uuid' => Type::makeUUID('Biens en vente', Type::TYPE_BIEN_EN_VENTE()),
            ],
        ];

        // Insérer les catégories principales
        foreach ($categories as $categoryData) {
            $category = PropertyCategory::create([
                'name' => $categoryData['name'],
                'slug' => $categoryData['slug'],
                'uuid' => $categoryData['uuid'],
                'type' => $categoryData['type'],
                'can_delete' => false,
                'can_upload_image' => true,
            ]);

            // Sous-catégories pour la catégorie principale "Maison"
            if ($category->name === 'Maison') {
                $subCategories = [
                    ['name' => 'Appartement', 'slug' => 'appartement',],
                    ['name' => 'Bureau', 'slug' => 'bureau',],
                    ['name' => 'Studio', 'slug' => 'studio',],
                    ['name' => '2 pièces', 'slug' => '2-pièces',],
                    ['name' => '3 pièces', 'slug' => '3-pièces',],
                    ['name' => '4 pièces', 'slug' => '4-pièces',],
                    ['name' => 'Villa', 'slug' => 'villa',],
                    ['name' => 'Duplex', 'slug' => 'duplex',],
                    ['name' => 'Triplex', 'slug' => 'triplex',],
                ];

                foreach ($subCategories as $subCategoryData) {
                    $category->children()->create([
                        'name' => $subCategoryData['name'],
                        'slug' => $subCategoryData['slug'],
                        'type' => Type::TYPE_LOCATION(),
                        'uuid' => Type::makeUUID($subCategoryData['name'], Type::TYPE_LOCATION()),
                        'can_delete' => false,
                        'can_upload_image' => true,
                    ]);
                }
            }

            if ($category->name === 'Entrepot') {
                $subCategories = [
                    [
                        'name' => 'Espace à louer',
                        'slug' => 'espace-a-louer',
                        'type' => Type::TYPE_LOCATION(),
                    ],
                    // ['name' => 'Autres', 'slug' => 'autres',],
                ];

                foreach ($subCategories as $subCategoryData) {
                    $category->children()->create([
                        'name' => $subCategoryData['name'],
                        'slug' => $subCategoryData['slug'],
                        'type' => $subCategoryData['type'],
                        'uuid' => Type::makeUUID($subCategoryData['name'], $subCategoryData['type']),
                        'can_delete' => false,
                        'can_upload_image' => true,
                    ]);
                }
            }

            if ($category->name === 'Reservation') {
                $subCategories = [
                    [
                        'name' => 'Résidence ',
                        'slug' => 'residence',
                        'type' => Type::TYPE_RESERVATION(),
                    ],
                    [
                        'name' => 'Hôtel',
                        'slug' => 'hotel',
                        'type' => Type::TYPE_RESERVATION(),
                    ],
                ];

                foreach ($subCategories as $subCategoryData) {
                    $category->children()->create([
                        'name' => $subCategoryData['name'],
                        'slug' => $subCategoryData['slug'],
                        'type' => Type::TYPE_RESERVATION(),
                        'uuid' => Type::makeUUID($subCategoryData['name'], Type::TYPE_RESERVATION()),
                        'can_delete' => false,
                        'can_upload_image' => true,
                    ]);
                }
            }


            if ($category->slug === 'biens-en-vente') {
                $subCategories = [
                    [
                        'name' => 'Maison ',
                        'slug' => 'achat-maison',
                        'type' => Type::TYPE_BIEN_EN_VENTE(),
                        'can_upload_image' => true,
                    ],
                    [
                        'name' => 'Terrain',
                        'slug' => 'terrain',
                        'type' => Type::TYPE_BIEN_EN_VENTE(),
                        'can_upload_image' => false,
                    ],
                    [
                        'name' => 'Entrepôt',
                        'slug' => 'entrepôt',
                        'type' => Type::TYPE_BIEN_EN_VENTE(),
                        'can_upload_image' => true,
                    ],
                    [
                        'name' => 'Magasin',
                        'slug' => 'achat-magasin',
                        'type' => Type::TYPE_BIEN_EN_VENTE(),
                        'can_upload_image' => true,
                    ],
                ];

                foreach ($subCategories as $subCategoryData) {
                    $category->children()->create([
                        'name' => $subCategoryData['name'],
                        'slug' => $subCategoryData['slug'],
                        'type' => Type::TYPE_BIEN_EN_VENTE(),
                        'uuid' => Type::makeUUID($subCategoryData['name'], Type::TYPE_BIEN_EN_VENTE()),
                        'can_delete' => false,
                        'can_upload_image' => $subCategoryData['can_upload_image'],
                    ]);
                }
            }
        }
    }
}


class Type
{
    static public function TYPE_LOCATION(): string
    {
        return 'LOCATION';
    }

    static public function TYPE_BIEN_EN_VENTE(): string
    {
        return 'BIEN EN VENTE';
    }

    static public function TYPE_RESERVATION(): string
    {
        return 'RESERVATION';
    }

    static public function makeUUID(string $name, string $type): string
    {
        // return (static::toConstantFormat($name)) . "__" . Str::uuid()->toString();
        return (static::toConstantFormat($type)) . "__" . (static::toConstantFormat($name));
    }

    static public function toConstantFormat($text)
    {
        return strtoupper(str_replace(' ', '_', $text));
    }
}
