<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PropertyImages extends Model
{
    use HasFactory;
    protected $table = 'property_images';

    protected $fillable = [
        'property_id',
        'image',
        'featured_image'
    ];

    protected $hidden = [
        'updated_at',
        'deleted_at'
    ];
}
