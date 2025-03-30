<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MetaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "key" => $this->key,
            "value" => $this->value,
            "type" => $this->type,
            "description" => $this->description,
            "user_id" => $this->user_id,
            "deleted_at" => $this->deleted_at,
            "created_at" => Carbon::parse($this->created_at)->format('d/m/Y H:i:s'),
            "updated_at" => Carbon::parse($this->updated_at)->format('d/m/Y H:i:s'),
        ];
    }
}
