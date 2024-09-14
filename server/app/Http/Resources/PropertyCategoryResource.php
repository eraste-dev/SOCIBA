<?php

namespace App\Http\Resources;

use App\Models\PropertyCategory;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Services\ImageService;

class PropertyCategoryResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'               => $this->id,
            'name'             => $this->name,
            'slug'             => $this->slug,
            'href'             => "/annonces/" . $this->slug,
            'type'             => explode(',', $this->type),
            'uuid'             => $this->uuid,
            'can_delete'       => boolval($this->can_delete),
            'can_upload_image' => boolval($this->can_upload_image),
            'icon'             => $this->icon,
            'description'      => $this->description,
            'thumbnail'        => $this->icon,
            'parent_id'        => $this->parent_id,
            'count'            => count($this->getChildren()),
            'children'         => $this->getChildren(),
            'parent'           => $this->getParent(),
        ];
    }
}
