<?php

namespace App\Models;

use App\Http\Resources\CityResource;
use App\Utils\Utils;
use Carbon\Carbon;
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
        'popularity_rate'
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

    public static function build_unlist_city_resource(string $name)
    {
        return [
            'id'              => 0,
            'name'            => $name,
            'href'            => "/annonces/?other_location=" . $name . "&other_location_id=" . $name,
            'city'            => null,
            'iso3'            => null,
            'iso2'            => null,
            'description'     => null,
            'lat'             => null,
            'long'            => null,
            'thumbnail'       => null,
            'updated_at'      => Carbon::parse(now())->format(Utils::DATE_FORMAT()),
            'count_post'      => 0,
            'popularity_rate' => 0
        ];
    }
}
