<?php

namespace App\Http\Resources;

use App\Utils\Utils;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CountryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'   => $this->id,
            'name' => $this->name,
            // 'href' => "/country/" . $this->slug,
            'iso3' => $this->iso3,
            'iso2' => $this->iso2,
            'phone_code' => $this->phone_code,
            'capital' => $this->capital,
            'currency' => $this->currency,
            'currency_name' => $this->currency_name,
            'currency_symbol' => $this->currency_symbol,
            'timezones' => $this->timezones,
            'translations' => $this->translations,
            'lat' => $this->lat,
            'long' => $this->long,
            'created_at' => Carbon::parse($this->created_at)->format(Utils::DATE_FORMAT()),
            'updated_at' =>  Carbon::parse($this->updated_at)->format(Utils::DATE_FORMAT()),
        ];
    }
}
