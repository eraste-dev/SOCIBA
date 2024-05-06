<?php

namespace App\Http\Resources;

use App\Models\PropertyCategory;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Services\ImageService;

class PropertyCategoryResource extends JsonResource
{
    public function toArray($request)
    {
        $children = PropertyCategory::where('parent_id', $this->id)->get();
        return [
            'id'           => $this->id,
            'name'         => $this->name,
            'href'         => "/annonces/" . $this->slug,
            'description'  => $this->description,
            'thumbnail'    => $this->icon,
            'parent_id'    => $this->parent_id,
            'count'        => count($children),
            'children'     => PropertyCategoryResource::collection($children),
        ];
    }
}
