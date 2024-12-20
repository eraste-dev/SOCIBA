<?php

namespace Tests\App\Utils;

use App\Utils\FakeProduct;
use PHPUnit\Framework\TestCase;

class FakeProductTest extends TestCase
{
    public function testFake()
    {
        $properties = FakeProduct::fake();

        // Check if the returned value is an array
        // ExampleTest
        $this->assertIsArray($properties);

        // Check if the array contains the expected number of elements
        $this->assertCount(7, $properties);


        // Assertions for a few key properties in the first element.  Add more as needed to cover important data.
        $this->assertEquals(9, $properties[0]['category_id']);
        $this->assertEquals("bien-en-vente-1", $properties[0]['slug']);
        $this->assertEquals("BIEN EN VENTE", $properties[0]['type']);
        $this->assertEquals(5000000, $properties[0]['price']);
        $this->assertEquals("PUBLISH", $properties[0]['status']);


        // Spot-check data in other array elements.  Expand these checks as needed.
        $this->assertEquals("location-2", $properties[1]['slug']);
        $this->assertEquals("LOCATION", $properties[1]['type']);

        $this->assertEquals("reservation-3", $properties[2]['slug']);
        $this->assertEquals("RESERVATION", $properties[2]['type']);

        // Add similar assertions for other elements in the array, checking key fields as required for thoroughness.
        $this->assertEquals("bien-en-vente-4", $properties[3]['slug']);
        $this->assertEquals("BIEN EN VENTE", $properties[3]['type']);
        $this->assertEquals(550000, $properties[3]['price']);


        $this->assertEquals("reservation-5", $properties[4]['slug']);
        $this->assertEquals("RESERVATION", $properties[4]['type']);
        $this->assertEquals(250000, $properties[4]['price']);

        $this->assertEquals("location-6", $properties[5]['slug']);
        $this->assertEquals("LOCATION", $properties[5]['type']);
        $this->assertEquals(175000, $properties[5]['price']);


        $this->assertEquals("reservation-7", $properties[6]['slug']);
        $this->assertEquals("RESERVATION", $properties[6]['type']);
        $this->assertEquals(1250000, $properties[6]['price']);
    }
}
