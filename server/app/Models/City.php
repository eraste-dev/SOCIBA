<?php

namespace App\Models;

use App\Http\Resources\CountryResource;
use App\Services\ImageService;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'iso3',
        'iso2',
        'description',
        'country_id',
        'lat',
        'long',
        'thumbnail',
    ];

    protected $hidden = ['country_id'];

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function getCountry()
    {
        try {
            return new CountryResource(Country::find($this->country_id));
        } catch (\Throwable $th) {
            return null;
        }
    }

    public function properties()
    {
        return $this->hasMany(Property::class);
    }

    public function getThumbnailAttribute($value)
    {
        return ImageService::getImage($value);
    }
}
