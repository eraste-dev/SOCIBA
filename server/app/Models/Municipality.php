<?php

namespace App\Models;

use App\Http\Resources\CityResource;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Municipality extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'city_id',
        'iso3',
        'iso2',
        'description',
        'lat',
        'long',
        'thumbnail',
    ];

    public function getCity()
    {
        // return $this->belongsTo(City::class, 'city_id');
        try {
            return new CityResource(City::find($this->city_id));
        } catch (\Throwable $th) {
            return null;
        }
    }

    public function count_products()
    {
        return Property::where('location_id', '=', $this->id)->count();
    }
}
