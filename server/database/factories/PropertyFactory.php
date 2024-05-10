<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Property>
 */
class PropertyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        if (!defined('PROPERTY_STATUS')) {
            define('PROPERTY_STATUS', [
                'PUBLISH'   => 'PUBLISH',
                'UNPUBLISH' => 'UNPUBLISH',
                'DRAFT'     => 'DRAFT',
                'DELETED'   => 'DELETED',
            ]);
        }

        $content = "";
        $paragraphs = $this->faker->paragraphs(rand(2, 6));
        $title = $this->faker->realText(50);
        $content = "<h1>{$title}</h1>";
        foreach ($paragraphs as $para) {
            $content .= "<p>{$para}</p>";
        }

        return [
            'category_id' => $this->faker->numberBetween(1, 5),
            'title' => $this->faker->sentence,
            'title' => ($this->faker->sentence),
            'slug' => Str::slug($this->faker->sentence),
            'description' => $this->faker->paragraph,
            'content' => $content,
            'address' => $this->faker->address,
            'location' => $this->faker->city,
            'client_address' => $this->faker->address,
            // 'property_type' => $this->faker->randomElement(['Appartement', 'Maison', 'Villa']),
            'price' => $this->faker->numberBetween(500000, 90000000),
            'post_type' => $this->faker->randomElement(POST_TYPE),
            'country' => $this->faker->country,
            'city' => $this->faker->city,
            'state' => $this->faker->citySuffix(),
            'video_link' => $this->faker->boolean(10) ?  'https://v3.cdnpk.net/videvo_files/video/free/2012-09/large_preview/hd1854.mp4' : null,
            'latitude' => $this->faker->latitude,
            'longitude' => $this->faker->longitude,
            'created_by' => $this->faker->name,
            'updated_by' => $this->faker->name,
            'status' => $this->faker->randomElement(PROPERTY_STATUS),
            'total_click' => $this->faker->numberBetween(500, 5000),
        ];
    }
}
