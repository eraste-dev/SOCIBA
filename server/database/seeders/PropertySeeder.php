<?php

namespace Database\Seeders;

use App\Models\Property;
use App\Utils\Utils;
use Illuminate\Database\Seeder;

class PropertySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (!defined('POST_TYPE')) {
            define('POST_TYPE', [
                'PROPERTY'   => 'PROPERTY',
                'BLOG'       => 'BLOG',
            ]);
        }

        if (!defined('PROPERTY_STATUS')) {
            define('PROPERTY_STATUS', [
                'PUBLISH'   => 'PUBLISH',
                'DRAFT'     => 'DRAFT',
                'DELETED'   => 'DELETED',
                'REJECTED' => 'REJECTED',
                'PENDING'   => 'PENDING',
                'BLOCKED'   => 'BLOCKED',
            ]);
        }

        $faker = \Faker\Factory::create();
        $dataExample = [
            [
                'category_id' => $faker->numberBetween(1, 5),
                'title' => 'Vente villa duplex 5 pièces - Cocody Riviera Attoban',
                'slug' => 'vente-villa-duplex-5-pièces-cocody-riviera-attoban',
                'excerpt' => 'À vendre une très belle duplex de 5 pièces situé à cocody riviera attoban. elle est composé de: ',
                'content' => "
                À vendre une très belle duplex de 5 pièces situé à cocody riviera attoban. elle est composé de: 3 chambres non autonomes une très grande cuisine un grand salon ⁠toilette centrale pour les 3 chambres une chambre principale autonome + un balcon une dépendance autonome toilette visiteur un garage de 2 véhicules cour avant, cour arrière superficie : 300m2 prix : 170 millions document : cpf
                ",
                'address' => 'Cocody',
                'client_address' => 'Cocody',
                'type' => 'LOCATION',
                'price' => $faker->numberBetween(50000, 200000),
                // 'deposit_price' => $faker->numberBetween(70000, 2000000),
                'location_id' => $faker->numberBetween(1, 10),
                'location_description' => 'Cocody Riviera Attoban',
                'video_link' =>  null,
                'latitude' => $faker->latitude,
                'longitude' => $faker->longitude,
                'created_by' => $faker->numberBetween(1, 2),
                'updated_by' => $faker->numberBetween(1, 2),
                'status' => Utils::STATE_PUBLISH(),
                'total_click' => $faker->numberBetween(500, 5000),
            ],
        ];


        $data = [
            [
                'category_id' => 2,
                'title' => 'Villa duplex 5 pièces - Cocody Riviera Attoban',
                'slug' => 'villa-duplex-5-pièces-cocody-riviera-attoban',
                'excerpt' => 'À vendre une très belle duplex de 5 pièces situé à cocody riviera attoban. elle est composé de: ',
                'content' => "
                À vendre une très belle duplex de 5 pièces situé à cocody riviera attoban. elle est composé de: 3 chambres non autonomes une très grande cuisine un grand salon ⁠toilette centrale pour les 3 chambres une chambre principale autonome + un balcon une dépendance autonome toilette visiteur un garage de 2 véhicules cour avant, cour arrière superficie : 300m2 prix : 170 millions document : cpf
                ",
                'address' => 'Cocody',
                'client_address' => 'Cocody',
                'type' => 'LOCATION',
                'price' => 170000,
                // 'deposit_price' => 1200000,
                'location_id' => 7,
                'location_description' => 'Cocody Riviera Attoban',
                'video_link' => null,
                'latitude' => 5.3423,
                'longitude' => -4.0123,
                'created_by' => 1,
                'updated_by' => 1,
                'status' => Utils::STATE_PUBLISH(),
                'total_click' => 1200,
                'periodicity' => 'MONTH',
                'bathrooms' => 1,
                'kitchens' => 1,
                'area' => 300,
                'count_advance' => 5,
                'count_monthly' => 5,
                'security' => 'WITH_GUARD',
                "purchase_power"=>"MORE_EXPENSIVE"
            ],
            [
                'category_id' => 17,
                'title' => 'Location villa 4 pièces - Yopougon',
                'slug' => 'location-villa-4-pièces-yopougon',
                'excerpt' => 'À louer une belle villa de 4 pièces situé à Yopougon. elle est composé de: ',
                'content' => "
                À louer une belle villa de 4 pièces situé à Yopougon. elle est composé de: 2 chambres non autonomes une cuisine équipée un grand salon ⁠toilette centrale pour les 2 chambres une chambre principale autonome + un balcon une dépendance autonome toilette visiteur un garage de 1 véhicule cour avant, cour arrière superficie : 250m2 prix : 1.5 millions par mois document : cpf
                ",
                'address' => 'Yopougon',
                'client_address' => 'Yopougon',
                'type' => 'RESERVATION',
                'price' => 15000,
                'location_id' => 13,
                'location_description' => 'Yopougon',
                'video_link' => null,
                'latitude' => 5.3211,
                'longitude' => -4.0234,
                'created_by' => 1,
                'updated_by' => 1,
                'status' => Utils::STATE_PUBLISH(),
                'total_click' => 800,
                'periodicity' => 'DAY',
                'jacuzzi' =>  true,
                'bath' => true,
                'WiFi' => true,
                'pool' =>  true,
                'home_type' => '2 pièces'
                // 'deposit_price' => 1000000,
            ],
            [
                'category_id' => 1,
                'title' => 'Achat villa 3 pièces - Marcory',
                'slug' => 'achat-villa-3-pièces-marcory',
                'excerpt' => 'À acheter une belle villa de 3 pièces situé à Marcory. elle est composé de: ',
                'content' => "
                À acheter une belle villa de 3 pièces situé à Marcory. elle est composé de: 2 chambres non autonomes une cuisine équipée un grand salon ⁠toilette centrale pour les 2 chambres une chambre principale autonome + un balcon une dépendance autonome toilette visiteur un garage de 1 véhicule cour avant, cour arrière superficie : 200m2 prix : 120 millions document : cpf
                ",
                'address' => 'Marcory',
                'client_address' => 'Marcory',
                'type' => 'LOCATION',
                'price' => 12000000,
                'deposit_price' => 800000,
                'location_id' => 3,
                'location_description' => 'Marcory',
                'video_link' => null,
                'latitude' => 5.3012,
                'longitude' => -4.0356,
                'created_by' => 1,
                'updated_by' => 1,
                'status' => Utils::STATE_PUBLISH(),
                'total_click' => 1500,
                'periodicity' => 'MONTH'
            ],
            [
                'category_id' => 4,
                'title' => 'Vente villa 6 pièces - Cocody',
                'slug' => 'vente-villa-6-pièces-cocody',
                'excerpt' => 'À vendre une très belle villa de 6 pièces situé à Cocody. elle est composé de: ',
                'content' => "
                À vendre une très belle villa de 6 pièces situé à Cocody. elle est composé de: 4 chambres non autonomes une très grande cuisine un grand salon ⁠toilette centrale pour les 4 chambres une chambre principale autonome + un balcon une dépendance autonome toilette visiteur un garage de 3 véhicules cour avant, cour arrière superficie : 400m2 prix : 250 millions document : cpf
                ",
                'address' => 'Cocody',
                'client_address' => 'Cocody',
                'type' => 'RESERVATION',
                'price' => 25000,
                // 'deposit_price' => 1500000,
                'location_id' => 9,
                'location_description' => 'Cocody',
                'video_link' => null,
                'latitude' => 5.3521,
                'longitude' => -4.0112,
                'created_by' => 1,
                'updated_by' => 1,
                'status' => Utils::STATE_PUBLISH(),
                'total_click' => 2000,
                'periodicity' => 'VISIT',
                'jacuzzi' =>  false,
                'bath' => false,
                'WiFi' => true,
                'air_conditioning' => true,
                'pool' =>  false,
            ],
            [
                'category_id' => 21,
                'title' => 'Vente de villa 3 pièces - Abobo',
                'slug' => 'vente-villa-3-pièces-abobo',
                'excerpt' => 'À louer une belle villa de 3 pièces situé à Abobo. elle est composé de: ',
                'content' => "
                En vente une belle villa de 3 pièces situé à Abobo. elle est composé de: 2 chambres non autonomes une cuisine équipée un grand salon ⁠toilette centrale pour les 2 chambres une chambre principale autonome + un balcon une dépendance autonome toilette visiteur un garage de 1 véhicule cour avant, cour arrière superficie : 200m2 prix : 1.2 millions par mois document : cpf
                ",
                'address' => 'Abobo',
                'client_address' => 'Abobo',
                'type' => 'BIEN EN VENTE',
                'area_count' => 3,
                'price' => 3500000,
                // 'deposit_price' => 800000,
                'location_id' => 2,
                'location_description' => 'Abobo',
                'video_link' => null,
                'latitude' => 5.3912,
                'longitude' => -4.0412,
                'created_by' => 1,
                'updated_by' => 1,
                'status' => Utils::STATE_PUBLISH(),
                'total_click' => 1000,
                'area' => 500,
                'area_unit' => 'M',
                'acd' => false,
            ],
            [
                'category_id' => 3,
                'title' => 'Vente villa 5 pièces - Plateau',
                'slug' => 'vente-villa-5-pièces-plateau',
                'excerpt' => 'À vendre une très belle villa de 5 pièces situé à Plateau. elle est composé de: ',
                'content' => "
                À vendre une très belle villa de 5 pièces situé à Plateau. elle est composé de: 3 chambres non autonomes une très grande cuisine un grand salon ⁠toilette centrale pour les 3 chambres une chambre principale autonome + un balcon une dépendance autonome toilette visiteur un garage de 2 véhicules cour avant, cour arrière superficie : 350m2 prix : 200 millions document : cpf
                ",
                'address' => 'Plateau',
                'client_address' => 'Plateau',
                'type' => 'VENTE',
                'price' => 20000000,
                // 'deposit_price' => 1200000,
                'location_id' => 8,
                'location_description' => 'Plateau',
                'video_link' => null,
                'latitude' => 5.3112,
                'longitude' => -4.0212,
                'created_by' => 1,
                'updated_by' => 1,
                'status' => Utils::STATE_PUBLISH(),
                'total_click' => 1800,
                'periodicity' => 'MONTH'
            ],
            [
                'category_id' => 2,
                'title' => 'Location villa 4 pièces - Treichville',
                'slug' => 'location-villa-4-pièces-treichville',
                'excerpt' => 'À louer une belle villa de 4 pièces situé à Treichville. elle est composé de: ',
                'content' => "
                À louer une belle villa de 4 pièces situé à Treichville. elle est composé de: 2 chambres non autonomes une cuisine équipée un grand salon ⁠toilette centrale pour les 2 chambres une chambre principale autonome + un balcon une dépendance autonome toilette visiteur un garage de 1 véhicule cour avant, cour arrière superficie : 250m2 prix : 1.8 millions par mois document : cpf
                ",
                'address' => 'Treichville',
                'client_address' => 'Treichville',
                'type' => 'LOCATION',
                'price' => 1800000,
                // 'deposit_price' => 1200000,
                'location_id' => 6,
                'location_description' => 'Treichville',
                'video_link' => null,
                'latitude' => 5.3211,
                'longitude' => -4.0334,
                'created_by' => 1,
                'updated_by' => 1,
                'status' => Utils::STATE_PUBLISH(),
                'total_click' => 1200,
                'periodicity' => 'MONTH'
            ],
            [
                'category_id' => 1,
                'title' => 'Achat villa 3 pièces - Koumassi',
                'slug' => 'achat-villa-3-pièces-koumassi',
                'excerpt' => 'À acheter une belle villa de 3 pièces situé à Koumassi. elle est composé de: ',
                'content' => "
                À acheter une belle villa de 3 pièces situé à Koumassi. elle est composé de: 2 chambres non autonomes une cuisine équipée un grand salon ⁠toilette centrale pour les 2 chambres une chambre principale autonome + un balcon une dépendance autonome toilette visiteur un garage de 1 véhicule cour avant, cour arrière superficie : 200m2 prix : 100 millions document : cpf
                ",
                'address' => 'Koumassi',
                'client_address' => 'Koumassi',
                'type' => 'ACHAT',
                'price' => 10000000,
                // 'deposit_price' => 600000,
                'location_id' => 4,
                'location_description' => 'Koumassi',
                'video_link' => null,
                'latitude' => 5.2812,
                'longitude' => -4.0512,
                'created_by' => 1,
                'updated_by' => 1,
                'status' => Utils::STATE_PUBLISH(),
                'total_click' => 1500,
                'periodicity' => 'MONTH'
            ],
            [
                'category_id' => 4,
                'title' => 'Vente villa 6 pièces - Riviera',
                'slug' => 'vente-villa-6-pièces-riviera',
                'excerpt' => 'À vendre une très belle villa de 6 pièces situé à Riviera. elle est composé de: ',
                'content' => "
                À vendre une très belle villa de 6 pièces situé à Riviera. elle est composé de: 4 chambres non autonomes une très grande cuisine un grand salon ⁠toilette centrale pour les 4 chambres une chambre principale autonome + un balcon une dépendance autonome toilette visiteur un garage de 3 véhicules cour avant, cour arrière superficie : 400m2 prix : 280 millions document : cpf
                ",
                'address' => 'Riviera',
                'client_address' => 'Riviera',
                'type' => 'VENTE',
                'price' => 28000000,
                // 'deposit_price' => 1800000,
                'location_id' => 10,
                'location_description' => 'Riviera',
                'video_link' => null,
                'latitude' => 5.3412,
                'longitude' => -4.0112,
                'created_by' => 1,
                'updated_by' => 1,
                'status' => Utils::STATE_PUBLISH(),
                'total_click' => 2200,
                'periodicity' => 'MONTH'
            ],
            [
                'category_id' => 5,
                'title' => 'Location villa 3 pièces - Bingerville',
                'slug' => 'location-villa-3-pièces-bingerville',
                'excerpt' => 'À louer une belle villa de 3 pièces situé à Bingerville. elle est composé de: ',
                'content' => "
                À louer une belle villa de 3 pièces situé à Bingerville. elle est composé de: 2 chambres non autonomes une cuisine équipée un grand salon ⁠toilette centrale pour les 2 chambres une chambre principale autonome + un balcon une dépendance autonome toilette visiteur un garage de 1 véhicule cour avant, cour arrière superficie : 200m2 prix : 1.5 millions par mois document : cpf
                ",
                'address' => 'Bingerville',
                'client_address' => 'Bingerville',
                'type' => 'LOCATION',
                'price' => 1500000,
                // 'deposit_price' => 1000000,
                'location_id' => 1,
                'location_description' => 'Bingerville',
                'video_link' => null,
                'latitude' => 5.3512,
                'longitude' => -4.0212,
                'created_by' => 1,
                'updated_by' => 1,
                'status' => Utils::STATE_PUBLISH(),
                'total_click' => 1000,
                'periodicity' => 'MONTH'
            ],
            [
                'category_id' => 3,
                'title' => 'Vente villa duplex 5 pièces - Cocody Riviera Attoban',
                'slug' => 'vente-villa-duplex-5-pièces-cocody-riviera-attoban',
                'excerpt' => 'À vendre une très belle duplex de 5 pièces situé à cocody riviera attoban. elle est composé de: ',
                'content' => "
                À vendre une très belle duplex de 5 pièces situé à cocody riviera attoban. elle est composé de: 3 chambres non autonomes une très grande cuisine un grand salon <strong>toilette centrale pour les 3 chambres</strong> une chambre principale autonome + un balcon une dépendance autonome <a href='#'>toilette visiteur</a> un garage de 2 véhicules cour avant, cour arrière superficie : 300m2 prix : 170 millions document : cpf
                ",
                'address' => 'Cocody',
                'client_address' => 'Cocody',
                'type' => 'VENTE',
                'price' => 17000000,
                // 'deposit_price' => 1200000,
                'location_id' => 7,
                'location_description' => 'Cocody Riviera Attoban',
                'video_link' => null,
                'latitude' => 5.3423,
                'longitude' => -4.0123,
                'created_by' => 1,
                'updated_by' => 1,
                'status' => Utils::STATE_PUBLISH(),
                'total_click' => 1200,
                'periodicity' => 'MONTH'
            ],
            [
                'category_id' => 2,
                'title' => 'Location villa 4 pièces - Yopougon',
                'slug' => 'location-villa-4-pièces-yopougon',
                'excerpt' => 'À louer une belle villa de 4 pièces situé à Yopougon. elle est composé de: ',
                'content' => "
                À louer une belle villa de 4 pièces situé à Yopougon. elle est composé de: 2 chambres non autonomes une cuisine équipée un grand salon <i>toilette centrale pour les 2 chambres</i> une chambre principale autonome + un balcon une dépendance autonome <b>toilette visiteur</b> un garage de 1 véhicule cour avant, cour arrière superficie : 250m2 prix : 1.5 millions par mois document : cpf
                ",
                'address' => 'Yopougon',
                'client_address' => 'Yopougon',
                'type' => 'LOCATION',
                'price' => 1500000,
                // 'deposit_price' => 1000000,
                'location_id' => 5,
                'location_description' => 'Yopougon',
                'video_link' => null,
                'latitude' => 5.3211,
                'longitude' => -4.0234,
                'created_by' => 1,
                'updated_by' => 1,
                'status' => Utils::STATE_PUBLISH(),
                'total_click' => 800,
                'periodicity' => 'MONTH'
            ],
            [
                'category_id' => 1,
                'title' => 'Achat villa 3 pièces - Marcory',
                'slug' => 'achat-villa-3-pièces-marcory',
                'excerpt' => 'À acheter une belle villa de 3 pièces situé à Marcory. elle est composé de: ',
                'content' => "
                À acheter une belle villa de 3 pièces situé à Marcory. elle est composé de: 2 chambres non autonomes une cuisine équipée un grand salon <u>toilette centrale pour les 2 chambres</u> une chambre principale autonome + un balcon une dépendance autonome <sup>toilette visiteur</sup> un garage de 1 véhicule cour avant, cour arrière superficie : 200m2 prix : 120 millions document : cpf
                ",
                'address' => 'Marcory',
                'client_address' => 'Marcory',
                'type' => 'ACHAT',
                'price' => 12000000,
                // 'deposit_price' => 800000,
                'location_id' => 3,
                'location_description' => 'Marcory',
                'video_link' => null,
                'latitude' => 5.3012,
                'longitude' => -4.0356,
                'created_by' => 1,
                'updated_by' => 1,
                'status' => Utils::STATE_PUBLISH(),
                'total_click' => 1500,
                'periodicity' => 'MONTH'
            ],
            [
                'category_id' => 4,
                'title' => 'Vente villa 6 pièces - Cocody',
                'slug' => 'vente-villa-6-pièces-cocody',
                'excerpt' => 'À vendre une très belle villa de 6 pièces situé à Cocody. elle est composé de: ',
                'content' => "
                À vendre une très belle villa de 6 pièces situé à Cocody. elle est composé de: 4 chambres non autonomes une très grande cuisine un grand salon <span>toilette centrale pour les 4 chambres</span> une chambre principale autonome + un balcon une dépendance autonome <font color='red'>toilette visiteur</font> un garage de 3 véhicules cour avant, cour arrière superficie : 400m2 prix : 250 millions document : cpf
                ",
                'address' => 'Cocody',
                'client_address' => 'Cocody',
                'type' => 'VENTE',
                'price' => 25000000,
                // 'deposit_price' => 1500000,
                'location_id' => 9,
                'location_description' => 'Cocody',
                'video_link' => null,
                'latitude' => 5.3521,
                'longitude' => -4.0112,
                'created_by' => 1,
                'updated_by' => 1,
                'status' => Utils::STATE_PUBLISH(),
                'total_click' => 2000,
                'periodicity' => 'MONTH'
            ],
            [
                'category_id' => 5,
                'title' => 'Location villa 3 pièces - Abobo',
                'slug' => 'location-villa-3-pièces-abobo',
                'excerpt' => 'À louer une belle villa de 3 pièces situé à Abobo. elle est composé de: ',
                'content' => "
                À louer une belle villa de 3 pièces situé à Abobo. elle est composé de: 2 chambres non autonomes une cuisine équipée un grand salon <sub>toilette centrale pour les 2 chambres</sub> une chambre principale autonome + un balcon une dépendance autonome <code>toilette visiteur</code> un garage de 1 véhicule cour avant, cour arrière superficie : 200m2 prix : 1.2 millions par mois document : cpf
                ",
                'address' => 'Abobo',
                'client_address' => 'Abobo',
                'type' => 'LOCATION',
                'price' => 1200000,
                // 'deposit_price' => 800000,
                'location_id' => 2,
                'location_description' => 'Abobo',
                'video_link' => null,
                'latitude' => 5.3912,
                'longitude' => -4.0412,
                'created_by' => 1,
                'updated_by' => 1,
                'status' => Utils::STATE_PUBLISH(),
                'total_click' => 1000,
                'periodicity' => 'MONTH'
            ],
            [
                'category_id' => 3,
                'title' => 'Vente villa 5 pièces - Plateau',
                'slug' => 'vente-villa-5-pièces-plateau',
                'excerpt' => 'À vendre une très belle villa de 5 pièces situé à Plateau. elle est composé de: ',
                'content' => "
                À vendre une très belle villa de 5 pièces situé à Plateau. elle est composé de: 3 chambres non autonomes une très grande cuisine un grand salon <em>toilette centrale pour les 3 chambres</em> une chambre principale autonome + un balcon une dépendance autonome <i>toilette visiteur</i> un garage de 2 véhicules cour avant, cour arrière superficie : 350m2 prix : 200 millions document : cpf
                ",
                'address' => 'Plateau',
                'client_address' => 'Plateau',
                'type' => 'VENTE',
                'price' => 20000000,
                // 'deposit_price' => 1200000,
                'location_id' => 8,
                'location_description' => 'Plateau',
                'video_link' => null,
                'latitude' => 5.3112,
                'longitude' => -4.0212,
                'created_by' => 1,
                'updated_by' => 1,
                'status' => Utils::STATE_PUBLISH(),
                'total_click' => 1800,
                'periodicity' => 'MONTH'
            ],
            [
                'category_id' => 2,
                'title' => 'Location villa 4 pièces - Treichville',
                'slug' => 'location-villa-4-pièces-treichville',
                'excerpt' => 'À louer une belle villa de 4 pièces situé à Treichville. elle est composé de: ',
                'content' => "
                À louer une belle villa de 4 pièces situé à Treichville. elle est composé de: 2 chambres non autonomes une cuisine équipée un grand salon <strike>toilette centrale pour les 2 chambres</strike> une chambre principale autonome + un balcon une dépendance autonome <s>toilette visiteur</s> un garage de 1 véhicule cour avant, cour arrière superficie : 250m2 prix : 1.8 millions par mois document : cpf
                ",
                'address' => 'Treichville',
                'client_address' => 'Treichville',
                'type' => 'LOCATION',
                'price' => 1800000,
                // 'deposit_price' => 1200000,
                'location_id' => 6,
                'location_description' => 'Treichville',
                'video_link' => null,
                'latitude' => 5.3211,
                'longitude' => -4.0334,
                'created_by' => 1,
                'updated_by' => 1,
                'status' => Utils::STATE_PUBLISH(),
                'total_click' => 1200,
                'periodicity' => 'MONTH'
            ],
            [
                'category_id' => 1,
                'title' => 'Achat villa 3 pièces - Koumassi',
                'slug' => 'achat-villa-3-pièces-koumassi',
                'excerpt' => 'À acheter une belle villa de 3 pièces situé à Koumassi. elle est composé de: ',
                'content' => "
                À acheter une belle villa de 3 pièces situé à Koumassi. elle est composé de: 2 chambres non autonomes une cuisine équipée un grand salon <del>toilette centrale pour les 2 chambres</del> une chambre principale autonome + un balcon une dépendance autonome <ins>toilette visiteur</ins> un garage de 1 véhicule cour avant, cour arrière superficie : 200m2 prix : 100 millions document : cpf
                ",
                'address' => 'Koumassi',
                'client_address' => 'Koumassi',
                'type' => 'ACHAT',
                'price' => 10000000,
                // 'deposit_price' => 600000,
                'location_id' => 4,
                'location_description' => 'Koumassi',
                'video_link' => null,
                'latitude' => 5.2812,
                'longitude' => -4.0512,
                'created_by' => 1,
                'updated_by' => 1,
                'status' => Utils::STATE_PUBLISH(),
                'total_click' => 1500,
                'periodicity' => 'MONTH'
            ],
            [
                'category_id' => 4,
                'title' => 'Vente villa 6 pièces - Riviera',
                'slug' => 'vente-villa-6-pièces-riviera',
                'excerpt' => 'À vendre une très belle villa de 6 pièces situé à Riviera. elle est composé de: ',
                'content' => "
                À vendre une très belle villa de 6 pièces situé à Riviera. elle est composé de: 4 chambres non autonomes une très grande cuisine un grand salon <sup>toilette centrale pour les 4 chambres</sup> une chambre principale autonome + un balcon une dépendance autonome <sub>toilette visiteur</sub> un garage de 3 véhicules cour avant, cour arrière superficie : 400m2 prix : 280 millions document : cpf
                ",
                'address' => 'Riviera',
                'client_address' => 'Riviera',
                'type' => 'VENTE',
                'price' => 28000000,
                // 'deposit_price' => 1800000,
                'location_id' => 10,
                'location_description' => 'Riviera',
                'video_link' => null,
                'latitude' => 5.3412,
                'longitude' => -4.0112,
                'created_by' => 1,
                'updated_by' => 1,
                'status' => Utils::STATE_PUBLISH(),
                'total_click' => 2200,
                'periodicity' => 'MONTH'
            ],
            [
                'category_id' => 5,
                'title' => 'Location villa 3 pièces - Bingerville',
                'slug' => 'location-villa-3-pièces-bingerville',
                'excerpt' => 'À louer une belle villa de 3 pièces situé à Bingerville. elle est composé de: ',
                'content' => "
                À louer une belle villa de 3 pièces situé à Bingerville. elle est composé de: 2 chambres non autonomes une cuisine équipée un grand salon <u>toilette centrale pour les 2 chambres</u> une chambre principale autonome + un balcon une dépendance autonome <b>toilette visiteur</b> un garage de 1 véhicule cour avant, cour arrière superficie : 200m2 prix : 1.5 millions par mois document : cpf
                ",
                'address' => 'Bingerville',
                'client_address' => 'Bingerville',
                'type' => 'LOCATION',
                'price' => 1500000,
                // 'deposit_price' => 1000000,
                'location_id' => 1,
                'location_description' => 'Bingerville',
                'video_link' => null,
                'latitude' => 5.3512,
                'longitude' => -4.0212,
                'created_by' => 1,
                'updated_by' => 1,
                'status' => Utils::STATE_PUBLISH(),
                'total_click' => 1000,
                'periodicity' => 'MONTH'
            ],
            [
                'category_id' => 3,
                'title' => 'Vente villa duplex 5 pièces - Cocody Riviera Attoban',
                'slug' => 'vente-villa-duplex-5-pièces-cocody-riviera-attoban',
                'excerpt' => 'À vendre une très belle duplex de 5 pièces situé à cocody riviera attoban. elle est composé de: ',
                'content' => "
                <p>À vendre une très belle duplex de 5 pièces situé à cocody riviera attoban. Elle est composée de 3 chambres non autonomes, une très grande cuisine, un grand salon et une toilette centrale pour les 3 chambres.</p>

                <p>La villa dispose également d'une chambre principale autonome avec un balcon, une dépendance autonome, une toilette visiteur et un garage pouvant accueillir 2 véhicules.</p>

                <p>Située sur un terrain de 300m2, cette propriété offre une cour avant et une cour arrière, offrant ainsi un espace de vie spacieux et agréable.</p>

                <p>Les finitions sont de qualité, avec des matériaux durables et de bon goût. La villa a été construite selon les normes en vigueur, garantissant ainsi la sécurité et le confort de ses occupants.</p>

                <p>Le quartier de Cocody Riviera Attoban est réputé pour sa tranquillité et son cadre de vie agréable. Proche des commodités (écoles, commerces, transports), cette villa est idéale pour une famille à la recherche d'un havre de paix.</p>

                <p>Le prix de vente est fixé à 170 millions de francs CFA, avec un document de propriété de type CPF (Certificat de Propriété Foncière).</p>

                <p>N'hésitez pas à nous contacter pour plus d'informations ou pour organiser une visite de cette magnifique propriété. Nous serons ravis de vous accueillir et de répondre à toutes vos questions.</p>

                <p>Cette villa est une opportunité rare sur le marché immobilier ivoirien. Ne la laissez pas passer et devenez le propriétaire de cette magnifique duplex située dans l'un des quartiers les plus prisés d'Abidjan.</p>
                ",
                'address' => 'Cocody',
                'client_address' => 'Cocody',
                'type' => 'VENTE',
                'price' => 17000000,
                // 'deposit_price' => 1200000,
                'location_id' => 7,
                'location_description' => 'Cocody Riviera Attoban',
                'video_link' => null,
                'latitude' => 5.3423,
                'longitude' => -4.0123,
                'created_by' => 1,
                'updated_by' => 1,
                'status' => Utils::STATE_PUBLISH(),
                'total_click' => 1200,
                'periodicity' => 'MONTH'
            ],
            [
                'category_id' => 4,
                'title' => 'Vente villa 6 pièces - Cocody Angré',
                'slug' => 'vente-villa-6-pièces-cocody-angré',
                'excerpt' => 'À vendre une magnifique villa de 6 pièces située à Cocody Angré. Elle est composée de: ',
                'content' => "
                <p>À vendre une magnifique villa de 6 pièces située à Cocody Angré. Cette propriété est un véritable havre de paix, offrant un cadre de vie exceptionnel à ses occupants.</p>

                <p>La villa est composée de 4 chambres non autonomes, une très grande cuisine, un grand salon et une toilette centrale pour les 4 chambres. Elle dispose également d'une chambre principale autonome avec un balcon, une dépendance autonome, une toilette visiteur et un garage pouvant accueillir 3 véhicules.</p>

                <p>Située sur un terrain de 400m2, cette villa offre une cour avant et une cour arrière, permettant ainsi de profiter pleinement des espaces extérieurs. Les finitions sont de très haute qualité, avec des matériaux nobles et des équipements haut de gamme.</p>

                <p>Le quartier de Cocody Angré est réputé pour sa sécurité et son calme. Proche des écoles, des commerces et des axes routiers principaux, cette villa est idéalement située pour une famille à la recherche d'un confort optimal.</p>

                <p>Le prix de vente est fixé à 280 millions de francs CFA, avec un document de propriété de type CPF (Certificat de Propriété Foncière). Cette villa est une opportunité rare sur le marché immobilier ivoirien, ne la laissez pas passer.</p>

                <p>N'hésitez pas à nous contacter pour plus d'informations ou pour organiser une visite de cette magnifique propriété. Nous serons ravis de vous accueillir et de répondre à toutes vos questions.</p>

                <p>Cette villa est un véritable bijou architectural, alliant design contemporain et confort moderne. Devenez le propriétaire de cette villa d'exception et profitez d'un cadre de vie exceptionnel.</p>

                <p>Nous mettons à votre disposition notre expertise et notre savoir-faire pour vous accompagner dans votre projet d'acquisition. Notre équipe de professionnels est à votre écoute pour vous guider et vous conseiller tout au long de votre démarche.</p>
                ",
                'address' => 'Cocody',
                'client_address' => 'Cocody',
                'type' => 'VENTE',
                'price' => 28000000,
                // 'deposit_price' => 1800000,
                'location_id' => 9,
                'location_description' => 'Cocody Angré',
                'video_link' => null,
                'latitude' => 5.3521,
                'longitude' => -4.0112,
                'created_by' => 2,
                'updated_by' => 2,
                'status' => Utils::STATE_PUBLISH(),
                'total_click' => 2000,
                'periodicity' => 'MONTH'
            ],
        ];

        foreach ($data as $key => $value) {
            // Property::create($value);
        }

        // Property::create($data[0]);
        // Property::create($data[1]);
        // Property::create($data[2]);
        // Property::create($data[3]);
        // Property::create($data[4]);

        for ($i = 0; $i < 5; $i++) {
            // Property::create($data[$i]);
        }
    }
}
