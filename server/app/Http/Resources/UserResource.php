<?php

namespace App\Http\Resources;

use App\Services\ImageService;
use App\Utils\Utils;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            "name"           => $this->name,
            "last_name"      => $this->last_name,
            "href"           => "user/" . $this->id,
            "email"          => $this->email,
            "phone"          => $this->phone,
            "fonction"       => $this->fonction,
            "phone_whatsapp" => $this->phone_whatsapp,
            'avatar'         => $this->avatar != null ? ImageService::getImage($this->avatar) : null,
            "type"           => $this->type,
            "status"         => $this->status,
            "updated_at"     => Carbon::parse($this->updated_at)->format(Utils::DATE_FORMAT()),
            // "products" => $this->getProductsByUser($this->id),
            "count_products" => $this->countProducts(),
            "meta"
        ];
    }
}
