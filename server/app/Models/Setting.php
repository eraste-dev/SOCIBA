<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = [
        // 'key',
        // 'value',
        'key',
        'value',
        'logo',
        'icon',
        'favicon',
        'title',
        'description',
        'keywords',
        'author',
        'email',
        'phone',
        'phone_whatsapp',
        'address',
        'facebook',
        'twitter',
        'instagram',
        'youtube',
        'linkedin',
        'pinterest',
    ];
}
