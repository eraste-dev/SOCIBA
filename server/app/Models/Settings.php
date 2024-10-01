<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Settings extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'value',

        // PAGE
        'about_us',
        'terms_and_conditions',
        'privacy_policy',
        'refund_policy',
        'support_policy',

        // LOGO
        'logo',

        // INFORMATIONS
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

    public static function default_key()
    {
        return 'DEFAULT_SETTINGS';
    }
}
