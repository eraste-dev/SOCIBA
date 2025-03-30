<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'iso3',
        'iso2',
        'phone_code',
        'capital',
        'currency',
        'currency_name',
        'currency_symbol',
        'timezones',
        'translations',
        'lat',
        'long',
    ];
}
