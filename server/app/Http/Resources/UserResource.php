<?php

namespace App\Http\Resources;

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
            "name"      => $this->name,
            "last_name" => $this->last_name,
            "email"     => $this->email,
            "phone"     => $this->phone,
            "type"      => $this->type,
            "status"    => $this->status,
            "updated_at" => Carbon::parse($this->updated_at)->format('d/m/Y H:i'),
        ];
    }
}