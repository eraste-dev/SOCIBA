<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PropertyImages>
 */
class PropertyImagesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'property_id' => $this->faker->numberBetween(1, 22),
            'image' => $this->getRandomImage($this->faker->numberBetween(1, 78)),
            'featured_image' => $this->faker->boolean(20)
        ];
    }

    public function getRandomImage(int $i)
    {
        return  "/images/products/" . strval($i) . '.jpg';
    }
}
