<?php

namespace App\Models;

use App\Http\Resources\MunicipalityResource;
use App\Http\Resources\PropertyCategoryResource;
use App\Http\Resources\PropertyImagesResource;
use App\Http\Resources\PropertyVideosResource;
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
        'price_second',
        'periodicity',
        'location_id',
        'unlisted_city',
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

        'bathrooms',
        'bedrooms',
        'garages',
        'kitchens',
        'rooms',
        'area',
        'area_unit',
        'area_count',
        'count_advance',
        'count_monthly',
        'acd',
        'site_approved',

        'jacuzzi',
        'bath',
        'WiFi',
        'pool',
        'air_conditioning',
        'home_type',
        'home_type_more',
        'security',
        'purchase_power',
        'accessibility',

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
            // unlisted_city
            if ($this->location_id != null) {
                return new MunicipalityResource(Municipality::find($this->location_id));
            } else {
                return Municipality::build_unlist_city_resource($this->unlisted_city ?? "");
            }
        } catch (\Throwable $th) {
            return null;
        }
    }

    public function getUnlistedCity()
    {
        try {
            // unlisted_city
            if ($this->$this->unlisted_city != null) {
                return Municipality::build_unlist_city_resource($this->unlisted_city ?? "");
            }

            return null;
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

    public function videos()
    {
        return $this->hasMany(PropertyVideo::class, 'property_id');
    }

    public function get_videos()
    {
        return PropertyVideosResource::collection(PropertyVideo::where('property_id', $this->id)->get());
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

    public function saveVideos($videos)
    {
        $this->images()->createMany($videos);
    }

    public static function requestSearch(): array
    {
        $payload = [
            'searchText'             => request()->searchText ?? null,
            'location_description'   => request()->location_description ?? null,
            'id'                     => request()->id ?? null,
            'slug'                   => request()->slug ?? null,
            'category'               => request()->category ?? null,
            'category_slug'          => request()->category_slug ?? null,
            'home_type'              => request()->home_type ?? null,
            'category_slug_selected' => request()->category_slug_selected ?? null,
            'category_uuid'          => request()->category_uuid ?? null,
            'categories'             => request()->categories ?? null,
            'location_id'            => request()->location_id ?? null,
            'locations'              => request()->locations ?? null,
            'location'               => request()->location ?? null,
            'unlisted_location'      => request()->unlisted_location ?? null,
            'other_location'         => request()->other_location ?? null,
            'other_city'             => request()->other_city ?? null,
            'top_seed'               => request()->top ?? false,
            'limit'                  => request()->limit ?? 84,
            'created_by'             => request()->created_by ?? null,
            'page'                   => request()->page ?? 1,
            'price_sort'             => request()->price_sort ?? null,
            'deposit_price_sort'     => request()->deposit_price_sort ?? null,
            'status'                 => request()->status ?? null,
            'type'                   => request()->type ?? null,
        ];

        return $payload;
    }
}
