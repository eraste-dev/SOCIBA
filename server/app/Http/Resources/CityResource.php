<?php

namespace App\Http\Resources;

use App\Services\ImageService;
use App\Utils\Utils;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CityResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'name'        => $this->name,
            'slug'        => $this->slug,
            'iso3'        => $this->iso3,
            'iso2'        => $this->iso2,
            'description' => $this->description,
            'country'     => $this->getCountry(),
            'lat'         => $this->lat,
            'long'        => $this->long,
            'thumbnail'   => ImageService::getImage($this->thumbnail),
            'updated_at'  => Carbon::parse($this->updated_at)->format(Utils::DATE_FORMAT()),
        ];
    }
}
