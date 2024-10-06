<?php

namespace Database\Seeders;

use App\Models\Property;
use App\Utils\FakeProduct;
use Illuminate\Database\Seeder;

class PropertySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (FakeProduct::fake() as $key => $value) {
            Property::create($value);
        }
    }
}
