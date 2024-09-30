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
                'type' => Type::TYPE_LOCATION() . "," . Type::TYPE_BIEN_EN_VENTE(),
                'uuid' => Type::makeUUID('MAISON', Type::TYPE_LOCATION()),
            ],
            [
                'name' => 'Appartement',
                'slug' => 'appartement',
                'icon' => '',
                'description' => '',
                'type' => Type::TYPE_LOCATION(),
                'uuid' => Type::makeUUID('APPARTEMENT', Type::TYPE_LOCATION()),
            ],
            [
                'name' => 'Espace',
                'slug' => 'espace',
                'icon' => '',
                'description' => '',
                'type' => Type::TYPE_LOCATION(),
                'uuid' => Type::makeUUID('ESPACE', Type::TYPE_LOCATION()),
            ],
            [
                'name' => 'Magasin',
                'slug' => 'magasin',
                'icon' => '',
                'description' => '',
                'type' => Type::TYPE_LOCATION(),
                'uuid' => Type::makeUUID('MAGASIN', Type::TYPE_LOCATION()),
            ],
            [
                'name' => 'Salle d\'évenement',
                'slug' => 'salle-d-evenement',
                'icon' => '',
                'description' => '',
                'type' => Type::TYPE_LOCATION(),
                'uuid' => Type::makeUUID('SALLE_EVENEMENT', Type::TYPE_LOCATION()),
            ],
            [
                'name' => 'Bureau',
                'slug' => 'bureau',
                'icon' => '',
                'description' => '',
                'type' => Type::TYPE_LOCATION(),
                'uuid' => Type::makeUUID('BUREAU', Type::TYPE_LOCATION()),
            ],
            [
                'name' => 'Résidence',
                'slug' => 'residence',
                'icon' => '',
                'description' => '',
                'type' => Type::TYPE_RESERVATION(),
                'uuid' => Type::makeUUID('RESIDENCE', Type::TYPE_RESERVATION()),
            ],
            [
                'name' => 'Hôtel',
                'slug' => 'hotel',
                'icon' => '',
                'description' => '',
                'type' => Type::TYPE_RESERVATION(),
                'uuid' => Type::makeUUID('HOTEL', Type::TYPE_RESERVATION()),
            ],
            [
                'name' => 'Terrain',
                'slug' => 'terrain',
                'icon' => '',
                'description' => '',
                'type' => Type::TYPE_BIEN_EN_VENTE(),
                'uuid' => Type::makeUUID('TERRAIN', Type::TYPE_BIEN_EN_VENTE()),
            ],
            // [
            //     'name' => 'Entrepôt',
            //     'slug' => 'entrepot',
            //     'icon' => '',
            //     'description' => '',
            //     'type' => Type::TYPE_BIEN_EN_VENTE(),
            //     'uuid' => Type::makeUUID('ENTREPOT', Type::TYPE_BIEN_EN_VENTE()),
            // ],
            [
                'name' => 'Autre bien immobilier',
                'slug' => 'autre-bien-immobilier',
                'icon' => '',
                'description' => '',
                'type' => Type::TYPE_BIEN_EN_VENTE(),
                'uuid' => Type::makeUUID('AUTRE_BIEN_IMMOBILIER', Type::TYPE_BIEN_EN_VENTE()),
            ],
        ];

        // Insérer les catégories principales
        foreach ($categories as $categoryData) {
            PropertyCategory::create([
                'name' => $categoryData['name'],
                'slug' => $categoryData['slug'],
                'uuid' => $categoryData['uuid'],
                'type' => $categoryData['type'],
                'can_delete' => true,
                'can_upload_image' => true,
            ]);
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
