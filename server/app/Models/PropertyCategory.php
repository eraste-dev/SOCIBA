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
        'parent_id',
        'slug',
        'icon',
        'description',
        'type',
        'uuid',
        'can_delete',
    ];

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
        // $cat = PropertyCategory::find($this->id);
        // $children = Property::whereIn('category_id', [$this->id, $cat->parent_id])->get();
        return PropertyCategoryResource::collection($children);
    }

    public static function getByParent()
    {
        $parents = PropertyCategory::where('parent_id', null)->get();
        return PropertyCategoryResource::collection($parents);
    }

    public function getParent()
    {
        if ($this->parent_id == null) {
            return null;
        }

        return PropertyCategory::find($this->parent_id);
    }
}
