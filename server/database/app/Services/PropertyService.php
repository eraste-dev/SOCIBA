<?php

namespace App\Services;


use App\Http\Resources\PropertyResource;
use App\Models\Municipality;
use App\Models\Property;
use App\Models\PropertyCategory;
use App\Models\PropertyVideo;
use App\Utils\Utils;
use Tymon\JWTAuth\Facades\JWTAuth;

class PropertyService
{
    /**
     * Recherche de propriété par filtre
     * @param array $payload Filtrer par : 
     *  - search_text
     *  - category
     *  - categories
     *  - location
     *  - locations
     *  - status
     *  - created_by
     *  - price_sort
     *  - top_seed
     *  - limit
     *  - page
     * @param bool $adminSearch Si la requête est faite par un administrateur, on ignore le statut de la propriété
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public static function search(array $payload, bool $adminSearch = false)
    {
        $query = Property::query();
        $queryCategory = PropertyCategory::query();
        $queryLocation = Municipality::query();

        $all_locations = Municipality::all();
        $categories = PropertyCategory::all();

        // ? searchText
        if ($payload['searchText'] && $payload['searchText'] !== '*') {
            $query->where(
                'title',
                'like',
                '%' . $payload['searchText'] . '%'
            );

            $query->orWhere(
                'content',
                'like',
                '%' . $payload['searchText'] . '%'
            );

            $query->orWhere(
                'excerpt',
                'like',
                '%' . $payload['searchText'] . '%'
            );

            $query->orWhere(
                'price',
                'like',
                '%' . $payload['searchText'] . '%'
            );

            $query->orWhere(
                'home_type',
                'like',
                '%' . $payload['searchText'] . '%'
            );

            $queryCategory->where(
                'name',
                'like',
                '%' . $payload['searchText'] . '%'
            );

            $queryLocation->where(
                'name',
                'like',
                '%' . $payload['searchText'] . '%'
            );

            // Recherche dans les villes (cities)
            $queryCities = \App\Models\City::query();
            $queryCities->where(
                'name',
                'like',
                '%' . $payload['searchText'] . '%'
            );

            $categories = $queryCategory->get();
            foreach ($categories as $category) {
                $query->orWhere(
                    'category_id',
                    $category->id
                );
            }

            $all_locations = $queryLocation->get();
            foreach ($all_locations as $location) {
                $query->orWhere(
                    'location_id',
                    $location->id
                );
            }

            // Recherche par villes - on cherche les municipalités de cette ville
            $all_cities = $queryCities->get();
            foreach ($all_cities as $city) {
                $city_municipalities = Municipality::where('city_id', $city->id)->get();
                foreach ($city_municipalities as $municipality) {
                    $query->orWhere(
                        'location_id',
                        $municipality->id
                    );
                }
            }

            // * SEARCH BY LOCATION DESCRIPTION (quartiers)
            $query->orWhere(
                'location_description',
                'like',
                '%' . $payload['searchText'] . '%'
            );
        }

        // Filtre par ID si spécifié
        if ($payload['id']) {
            $query->where('id', $payload['id']);
            $single = $query->firstOrFail();
            Property::increase_total_click($single->id);
            return new PropertyResource($single);
        }

        if ($payload['slug']) {
            $query->where('slug', $payload['slug']);
            $single = $query->firstOrFail();
            Property::increase_total_click($single->id);
            return new PropertyResource($single);
        }

        // Filtre par catégorie si spécifiée
        // ? category
        if ($payload['category'] && $payload['category'] !== '*') {
            $query->where('category_id', $payload['category']);
        }

        // location_description (quartier) - recherche partielle insensible à la casse
        if ($payload['location_description'] && $payload['location_description'] !== '*') {
            $query->where(
                'location_description',
                'like',
                '%' . strtolower($payload['location_description']) . '%'
            );
        }

        // ? categories
        if ($payload['categories'] && count(explode(',', $payload['categories'])) > 0) {
            $query->whereIn('category_id', explode(',', $payload['categories']));
        }

        // ? category_uuid
        if (isset($payload['category_uuid']) && $payload['category_uuid'] !== '*') {
            $cat = PropertyCategory::where('uuid', $payload['category_uuid'])->first();
            if ($cat && $cat->parent_id == null) {
                $cats = PropertyCategory::where('parent_id', $cat->id)->get();
                foreach ($cats as $c) {
                    $query->orWhere('category_id', $c->id);
                }
            } else {
                if ($cat != null && $cat->id) {
                    $query->where('category_id', $cat->id);
                }
            }
        }

        // ? category_slug
        if ($payload['category_slug'] && $payload['category_slug'] !== '*') {
            $cat = PropertyCategory::where('slug', $payload['category_slug'])->first();
            if ($cat && $cat->parent_id == null && !isset($payload['category_slug_selected'])) {
                $cats = PropertyCategory::where('parent_id', $cat->id)->get();
                foreach ($cats as $c) {
                    $query->orWhere('category_id', $c->id);
                }
            } else {
                if ($cat != null && $cat->id) {
                    $query->where('category_id', $cat->id);
                    // $query->where('type', "LOCATION");
                }
            }

            if ($payload['home_type'] && $payload['home_type'] !== '*') {
                $query->where(
                    'home_type',
                    'like',
                    '%' . $payload['home_type'] . '%'
                );
            }
            // $query->where('category_id', $cat->id);
        }

        // ? location_id
        if (isset($payload['location_id']) && $payload['location_id'] !== '*') {
            $query->where('location_id', $payload['location_id']);
        }

        // ? location
        if (isset($payload['location']) && $payload['location'] !== '*') {
            $query->where('location_id', $payload['location']);
        } else if ($payload['location'] == "0") {
            $query->where('location_id', null);
        }

        // ? city_id - filtrer par ville spécifique
        if (isset($payload['city_id']) && $payload['city_id'] !== '*' && $payload['city_id'] !== '') {
            $city_municipalities = Municipality::where('city_id', $payload['city_id'])->pluck('id');
            if ($city_municipalities->count() > 0) {
                $query->whereIn('location_id', $city_municipalities);
            }
        }

        if (isset($payload['unlisted_location']) && !isset($payload['location'])) {
            $query->where('location_id', null);
        }

        if (isset($payload['other_location']) && !isset($payload['location'])) {
            $query->where(
                'unlisted_city',
                'like',
                '%' . $payload['other_location'] . '%'
            );
        }

        // ? type
        if (isset($payload['type']) && $payload['type'] !== '*') {
            $query->where('type', $payload['type']);
        }

        // ? locations
        if (isset($payload['locations']) && count(explode(',', $payload['locations'])) > 0) {
            $query->whereIn('location_id', explode(',', $payload['locations']));
        }

        if (isset($payload['status'])) {
            if ($payload['status'] !== '*') {
                $statusArray = explode(',', $payload['status']);
                $query->whereIn('status', $statusArray);
            } else {
                // $query->whereNotIn('status', [Utils::STATE_DELETED()]);
            }
        } else if (!isset($payload['status'])) {
            $query->whereIn('status', [Utils::STATE_PUBLISH()]);
        }

        // ? BY CREATED_BY
        if ($payload['created_by'] && $payload['created_by'] !== '*') {
            $user = null;

            try {
                $user = JWTAuth::parseToken()->authenticate();
            } catch (\Throwable $th) {
                // dd($th);
            }

            if ($user != null && $user->type == 'ADMIN') {
                $query->whereNotIn('status', [Utils::STATE_DELETED()]);
            } else {
                $query->where('created_by', $payload['created_by']);
            }
        }

        // ? ORDER BY ------------------------------------------------------------
        // Trie par pertinence si demandé
        if (isset($payload['price_sort']) && $payload['price_sort'] !== '*') {
            $query->orderBy('price', $payload['price_sort']);
            // $query->orderBy('deposit_price', $payload['price_sort']); // pour les biens immóbilières
        } else if ($payload['top_seed']) {
            $query->orderBy('total_click', 'desc');
        } else {
            $query->orderBy('created_at', 'desc');
        }

        // Renvoie les données paginées avec une collection
        // $properties = $query->paginate($payload['limit']);
        $properties = $query->get();

        return PropertyResource::collection($properties);
    }

    /**
     * Uploads and associates videos with the given product.
     *
     * This function processes video uploads from the request, 
     * clears any existing videos associated with the product, 
     * and then saves the new video files to the specified directory. 
     * Each video is stored with a generated filename that includes 
     * the product ID and a timestamp. A database record is created 
     * for each video, linking it to the product.
     *
     * @param mixed $product The product with which the videos are to be associated.
     * @return void
     */
    public static function upload_video($product)
    {
        try {
            if (isset(request()->videos)) {
                PropertyVideo::clearVideo($product->id);
                $videos = request()->videos;
                foreach ($videos as $key => $image) {
                    $filetomove = $product->id . "__" . time() . "__video" . "__" . $key . "__"  . "." . $image->getClientOriginalExtension();

                    $destinationPath = public_path('assets/videos/products');
                    $image->move($destinationPath, $filetomove);

                    PropertyVideo::create([
                        'property_id' => $product->id,
                        'src'       => "/videos/products/" . $filetomove
                    ]);
                }
            }
        } catch (\Throwable $th) {
            var_dump($th);
        }
    }


    /**
     * Uploads and saves videos in the specified directory, 
     * without associating them with any product.
     * 
     * This function processes video uploads from the request, 
     * saves the new video files to the specified directory, 
     * and creates a database record for each video.
     * 
     * @return array The created records
     */
    public static function upload_unassigned_video()
    {
        $insert = [];
        if (isset(request()->videos) && is_array(request()->videos) && count(request()->videos) > 0) {
            $videos = request()->videos;
            foreach ($videos as $key => $image) {
                if ($image === null) {
                    continue;
                }
                $filetomove = "unassigned" . "__" . time() . "__video" . "__" . $key . "__"  . "." . $image->getClientOriginalExtension();

                $destinationPath = public_path('assets/videos/products');
                if (!file_exists($destinationPath)) {
                    mkdir($destinationPath, 0777, true);
                }
                $image->move($destinationPath, $filetomove);

                $insert[] = PropertyVideo::create([
                    'src'       => "/videos/products/" . $filetomove
                ]);
            }
        }
        return $insert;
    }
}
