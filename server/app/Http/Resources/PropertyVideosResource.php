<?php

namespace App\Http\Resources;

use App\Services\ImageService;
use App\Services\VideoService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PropertyVideosResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>P
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'src' => $this->src != null ? VideoService::getVideo($this->src) : null
        ];
    }
}
