<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserMeta extends Model
{
    use HasFactory;

    protected $table = "user_meta";

    protected $fillable = [
        "function",
        "influence_zone_detail",
        "influence_zone_id",
        "user_id",
    ];

    /**
     * Retrieves the Municipality model associated with the influence zone ID.
     *
     * @return Municipality|null The Municipality model or null if not found.
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException If the Municipality model is not found.
     */
    public function getInfluenceZone()
    {
        if ($this->influence_zone_id === null) {
            return null;
        }

        return Municipality::findOrFail($this->influence_zone_id);
    }
}
