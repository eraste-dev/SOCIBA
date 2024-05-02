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

    public static function getParents() {
        $categories          = PropertyCategory::with('children')->whereNull('parent_id')->get();
        $formattedCategories = PropertyCategoryResource::collection($categories);
        return $formattedCategories;
    }
}
