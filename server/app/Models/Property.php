<?php

namespace App\Models;

use App\Http\Resources\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasFactory;

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
        'state', // communes
        'country',
        'city',
        'status',
        'total_click',
        'latitude',
        'longitude',
        'location',
        'property_type',
        'details',
        'whatsapp_link',
        'facebook_link',
        'video_link',
        'post_type',
        'created_by',
        'updated_by',
    ];

    /**
     * Retrieves the category associated with this object.
     *
     * @return PropertyCategory The category associated with this object.
     */
    public function category()
    {
        return PropertyCategory::find($this->category_id);
        // return $this->belongsTo(PropertyCategory::class, 'category_id');
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
        return PropertyImages::where('property_id', $this->id)->get();
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
}
