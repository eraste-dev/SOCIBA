<?php

namespace App\Models;

use App\Http\Resources\PropertyCategoryResource;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PropertyCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'icon',
        'description',
        'type',
        'uuid',
        'can_delete',
        'can_upload_image',
    ];

    public function parent()
    {
        return null;
        // return $this->belongsTo(PropertyCategory::class, 'parent_id');
    }

    public function children()
    {
        return null;
        // return $this->hasMany(PropertyCategory::class, 'parent_id');
    }

    public function getChildren()
    {
        // $children = PropertyCategory::where('parent_id', $this->id)->get();
        $children = [];
        return PropertyCategoryResource::collection($children);
    }

    public static function getByParent()
    {
        // $parents = PropertyCategory::where('parent_id', null)->get();
        $parents = PropertyCategory::all();
        return PropertyCategoryResource::collection($parents);
    }

    public function getParent()
    {
        return [];
        // if ($this->parent_id == null) {
        //     return null;
        // }
        // return PropertyCategory::find($this->parent_id);
    }
}
