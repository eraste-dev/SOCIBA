<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class PropertyResource extends JsonResource
{
    public function toArray($request)
    {
        // dd($this->getAuthor());
        return [
            'id'                   => $this->id,
            'slug'                 => $this->slug,
            'href'                 => "/annonce/{$this->slug}?id=" . $this->id,
            // 'href'                 => "/annonce/{$this->slug}&?id=" . $this->id,

            'category'             => $this->category(),

            'title'                => $this->title,
            'excerpt'              => $this->excerpt,
            'content'              => $this->content,

            'address'              => $this->address,
            'client_address'       => $this->client_address,

            'price'                => $this->price,
            'price_second'         => $this->price_second,
            'deposit_price'        => $this->deposit_price,


            'location'             => $this->getLocation(),
            'unlisted_city'        => $this->unlisted_city, // $this->getUnlistedCity(),
            'location_description' => $this->location_description,


            'total_click'          => $this->total_click,
            'latitude'             => $this->latitude,
            'longitude'            => $this->longitude,
            'details'              => $this->details,
            'whatsapp_link'        => $this->whatsapp_link,
            'facebook_link'        => $this->facebook_link,
            'video_link'           => $this->video_link,
            "isLiked"              => false,

            // * AUTHOR
            'updated_by'           => $this->updated_by,
            'author'               => $this->getAuthor(),

            'type'                 => $this->type,
            'status'               => $this->status,
            'periodicity'          => $this->periodicity,

            // * IMAGES
            'images'               => $this->get_images() ?? [],
            'videos'               => $this->get_videos() ?? [],
            'featured_image'       => "{$this->featured_image}",

            // ! NOT_USED
            "like"                 => 5, //$this->commentCount()
            "commentCount"         => 15, // $this->commentCount()

            // * DETAILS
            "bathrooms"        => $this->bathrooms,
            "bedrooms"         => $this->bedrooms,
            "garages"          => $this->garages,
            "kitchens"         => $this->kitchens,
            "rooms"            => $this->rooms,
            "area"             => intval($this->area),
            "area_unit"        => $this->area_unit,
            "area_count"       => $this->area_count,
            "count_advance"    => $this->count_advance,
            "count_monthly"    => $this->count_monthly,
            "home_type"        => $this->home_type,
            "home_type_more"   => $this->home_type_more,
            "jacuzzi"          => boolval($this->jacuzzi),
            "bath"             => boolval($this->bath),
            "WiFi"             => boolval($this->WiFi),
            "pool"             => boolval($this->pool),
            "acd"              => boolval($this->acd),
            "site_approved"    => boolval($this->site_approved),
            "air_conditioning" => boolval($this->air_conditioning),
            "security"       => $this->security,
            "purchase_power" => $this->purchase_power,
            "accessibility"  => $this->accessibility,

            // * SOCIALS
            'facebook'       => $this->facebook,
            'twitter'        => $this->twitter,
            'instagram'      => $this->instagram,
            'youtube'        => $this->youtube,
            'tiktok'         => $this->tiktok,

            // * TIMESTAMPS
            'created_at'           => Carbon::parse($this->created_at)->diffForHumans(),
            'updated_at'           => Carbon::parse($this->updated_at)->diffForHumans(),

            // ? OTHERS
            // 'post_type'      => $this->post_type,
            // 'created_by'           => $this->created_by,
            // 'description'    => $this->description,
        ];
    }
}
