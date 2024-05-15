<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PropertyCategory>
 */
class PropertyCategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name'        => $this->faker->word,
            'slug'        => Str::slug($this->faker->slug),
            'description' => $this->faker->sentence,
            'icon'        => $this->faker->imageUrl(),
            'parent_id'   =>  $this->faker->numberBetween(1, 5),
        ];
    }
}
