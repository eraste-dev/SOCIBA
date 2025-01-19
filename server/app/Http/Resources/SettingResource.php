<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class SettingResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'key'                  => $this->key,
            'value'                => $this->value,
            'about_us'             => $this->about_us,
            'terms_and_conditions' => $this->terms_and_conditions,
            'privacy_policy'       => $this->privacy_policy,
            'refund_policy'        => $this->refund_policy,
            'support_policy'       => $this->support_policy,
        ];
    }
}
