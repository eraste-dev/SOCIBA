<?php

namespace App\Http\Resources;

use App\Services\ImageService;
use App\Utils\Utils;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MunicipalityResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'href' =>  "/annonces/?location=" . $this->slug . "&location_id=" . $this->id,
            'city' => $this->getCity(),
            'iso3' => $this->iso3,
            'iso2' => $this->iso2,
            'description' => $this->description,
            'lat' => $this->lat,
            'long' => $this->long,
            'thumbnail' => ImageService::getImage($this->thumbnail),
            'updated_at' => Carbon::parse($this->updated_at)->format(Utils::DATE_FORMAT()),
        ];
    }
}
