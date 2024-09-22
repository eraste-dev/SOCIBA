<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PropertyVideo extends Model
{
    use HasFactory;

    protected $fillable = [
        'property_id',
        'src',
    ];

    protected $hidden = [
        'updated_at',
        'deleted_at'
    ];

    public static function clearVideo(string $property_id)
    {
        static::where('property_id', $property_id)->delete();
    }
}
