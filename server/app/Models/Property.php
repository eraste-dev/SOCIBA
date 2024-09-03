<?php

namespace App\Models;

use App\Http\Resources\MunicipalityResource;
use App\Http\Resources\PropertyCategoryResource;
use App\Http\Resources\PropertyImagesResource;
use App\Http\Resources\UserResource;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasFactory;
    use Sluggable;

    protected $fillable = [
        'category_id',
        'title',
        'slug',
        // 'description',
        'excerpt',
        'content',
        'address',
        'client_address',
        'price',
        'deposit_price',
        'periodicity',
        'location_id',
        'location_description', // communes
        'status',
        'total_click',
        'latitude',
        'longitude',
        'type',
        'details',
        'whatsapp_link',
        'facebook_link',
        'video_link',
        // 'post_type',
        'created_by',
        'updated_by',
    ];

    protected $hidden = [
        'category_id',
        'location_id',
        'created_by',
        'updated_by',
    ];

    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'title'
            ]
        ];
    }

    /**
     * Retrieves the category associated with this object.
     *
     * @return PropertyCategory The category associated with this object.
     */
    public function category()
    {
        $cat = PropertyCategory::find($this->category_id);
        if ($cat) {
            return new PropertyCategoryResource($cat);
        }
        return null;
        // return $this->belongsTo(PropertyCategory::class, 'category_id');
    }

    public function getLocation()
    {
        try {
            return new MunicipalityResource(Municipality::find($this->location_id));
        } catch (\Throwable $th) {
            return null;
        }
    }

    /**
     * Retrieves the images associated with this property.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany The images associated with this property.
     */
    public function images()
    {
        return $this->hasMany(PropertyImages::class, 'property_id');
    }

    /**
     * Retrieves the images associated with this property.
     *
     * @return \Illuminate\Database\Eloquent\Collection The images associated with this property.
     */
    public function get_images()
    {
        return PropertyImagesResource::collection(PropertyImages::where('property_id', $this->id)->get());
    }

    public function getAuthor()
    {
        $user = User::find($this->created_by);
        if ($user) {
            return new UserResource($user);
        } else {
            return null;
        }
    }

    /**
     * Save multiple images associated with the property.
     *
     * @param array $images An array of image data to be saved.
     * @return void
     */
    public function saveImages($images)
    {
        $this->images()->createMany($images);
    }

    public static function requestSearch(): array
    {
        $payload = [
            'searchText'         => request()->searchText ?? null,
            'id'                 => request()->id ?? null,
            'slug'               => request()->slug ?? null,
            'category'           => request()->category ?? null,
            'category_slug'      => request()->category_slug ?? null,
            'categories'         => request()->categories ?? null,
            'location_id'        => request()->location_id ?? null,
            'locations'          => request()->locations ?? null,
            'location'           => request()->location ?? null,
            'top_seed'           => request()->top ?? false,
            'limit'              => request()->limit ?? 84,
            'created_by'         => request()->created_by ?? null,
            'page'               => request()->page ?? 1,
            'price_sort'         => request()->price_sort ?? null,
            'deposit_price_sort' => request()->deposit_price_sort ?? null
        ];

        return $payload;
    }
}
