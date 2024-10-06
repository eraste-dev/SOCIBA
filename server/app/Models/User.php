<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Http\Resources\MunicipalityResource;
use App\Http\Resources\PropertyResource;
use App\Notifications\ResetPasswordNotification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'last_name',
        'email',
        'phone',
        'phone_whatsapp',
        'password',
        'type',
        'status',
        'fonction',
        "influence_zone_id",
        "email_verified_at"
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public static function getImagePath()
    {
        return '/images/users';
    }

    public static function getAvatarPath()
    {
        return User::getImagePath() + '/avatars';
    }

    public function countProducts()
    {
        return Property::where(['created_by' => $this->id])->whereNotIn('status', ['DELETED'])->count();
        // return $this->hasMany(Property::class)->count();
    }

    /**
     * Retrieves the influence zone of the user.
     *
     * @return MunicipalityResource|null The influence zone of the user, or null if it doesn't exist.
     */
    public function getInfluenceZone(): ?MunicipalityResource
    {
        try {
            $influenceZone = Municipality::findOrFail($this->influence_zone_id);
            return new MunicipalityResource($influenceZone);
        } catch (\Throwable $th) {
            return null;
        }
    }

    public function rating(): float
    {
        if (UserScore::where('user_id', $this->id)->count() == 0) {
            return 0;
        } else {
            $score = round(UserScore::where('user_id', $this->id)->avg('score'), 2);
        }
        return $score;
    }

    /**
     * Retrieves the published products created by the user.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function getPublishedProductsByUser()
    {
        //  'status' => 'PUBLISHED'
        return PropertyResource::collection(Property::where(['created_by' => $this->id,])->get());
    }

    /**
     * Sends a password reset notification to the user.
     *
     * @param string $token The password reset token.
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($token));
    }
}
