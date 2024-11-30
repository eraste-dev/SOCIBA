<?php

namespace App\Http\Resources;

use App\Services\ImageService;
use App\Utils\Utils;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TestimonalResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id"             => $this->id,
            "message"        => $this->message,
            "validated"      => boolval($this->validated),
            "user"           => $this->getUser(),
            "created_at"     => Carbon::parse($this->created_at)->format(Utils::DATE_FORMAT()),
            "updated_at"     => Carbon::parse($this->updated_at)->format(Utils::DATE_FORMAT()),
        ];
    }
}
