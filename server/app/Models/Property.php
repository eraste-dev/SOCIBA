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
        'description',
        'address',
        'client_address',
        'price',
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

    public function category()
    {
        return PropertyCategory::find($this->category_id);
        // return $this->belongsTo(PropertyCategory::class, 'category_id');
    }

    public function get_images()
    {
        return PropertyImages::where('property_id', $this->id)->get();
    }
}
