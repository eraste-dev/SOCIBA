<?php

namespace App\Models;

use App\Http\Resources\MetaResource;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Meta extends Model
{
    use HasFactory;

    protected $table = "meta";

    protected $fillable = [
        'key',
        'value',
        'type',
        'description',
        'user_id',
    ];

    /**
     * Get the user function keys.
     *
     * @return string
     */
    public static function GET_USER_FUNCTION_KEY(): string
    {
        return '@USER_FUNCTION';
    }

    public static function GET_USER_FUNCTION_TYPE(): string
    {
        return '@USER_FUNCTION_TYPE';
    }

    public function listUserFunction()
    {
        $meta = $this
            ->where([
                'key' => self::GET_USER_FUNCTION_KEY(),
                'deleted_at' => null
            ])
            ->get();

        return MetaResource::collection($meta);
    }
}
