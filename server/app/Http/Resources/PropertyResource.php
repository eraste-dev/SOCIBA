<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Services\ImageService;
use Carbon\Carbon;

class PropertyResource extends JsonResource
{
    public function toArray($request)
    {
        // $created_by = User::findOrFail($this->created_by);
        return [
            'id'             => $this->id,
            'href'           => "/annonce/{$this->slug}",
            'category'       => $this->category(),
            'title'          => $this->title,
            'description'    => $this->description,
            'content'    => $this->content,
            'address'        => $this->address,
            'client_address' => $this->client_address,
            'price'          => $this->price,
            'state'          => $this->state,
            'country'        => $this->country,
            'city'           => $this->city,
            'status'         => $this->status,
            'total_click'    => $this->total_click,
            'latitude'       => $this->latitude,
            'longitude'      => $this->longitude,
            'location'       => $this->location,
            // 'property_type'  => $this->property_type,
            'details'        => $this->details,
            'whatsapp_link'  => $this->whatsapp_link,
            'facebook_link'  => $this->facebook_link,
            'video_link'     => $this->video_link,
            'images'         => $this->get_images() ?? [],
            'featured_image' => "{$this->featured_image}",
            'post_type'      => $this->post_type,
            'created_by'     => $this->created_by,
            'created_at'     => Carbon::parse($this->created_at)->format('d/m/Y H:i'),
            'updated_by'     => $this->updated_by,
            'updated_at'     => Carbon::parse($this->updated_at)->format('d/m/Y H:i'),
            "like"           => 5, //$this->commentCount()
            "commentCount"   => 15, // $this->commentCount()
            "isLiked"        => false,
            'author'         => [
                'name' =>  'Laurent Dupont',
                'href' => "/user",
                'avatar' => 'https://i.pravatar.cc/300'
            ]
        ];
    }
}
