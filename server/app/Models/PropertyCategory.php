<?php

namespace App\Models;

use App\Http\Resources\PropertyCategoryResource;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PropertyCategory extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'parent_id', 'slug', 'icon', 'description'];

    public function parent()
    {
        return $this->belongsTo(PropertyCategory::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(PropertyCategory::class, 'parent_id');
    }

    public function getChildren()
    {
        $children = PropertyCategory::where('parent_id', $this->id)->get();
        return PropertyCategoryResource::collection($children);
    }

    public function getParent()
    {
        if ($this->parent_id == null) {
            return null;
        }

        return PropertyCategory::find($this->parent_id);
    }
}
