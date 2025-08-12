<?php

namespace App\Models;

use App\Http\Resources\UserResource;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'message',
        'validated'
    ];

    public function getUser()
    {
        if ($this->user_id) {
            $user = User::find($this->user_id);
            if ($user) {
                return new UserResource($user);
            }
        }
        return null;
    }
}
