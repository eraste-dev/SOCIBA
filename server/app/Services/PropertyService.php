<?php

namespace App\Services;

use App\Http\Resources\Collection;
use App\Http\Resources\PropertyResource;
use App\Models\Property;
use App\Models\Slider;
use App\Utils\Utils;

class PropertyService
{
    /**
     * Perform property search.
     *
     * @param array $payload
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public static function search(array $payload)
    {
        $query = Property::query();

        // Filtre par ID si spécifié
        if ($payload['id']) {
            $query->where('id', $payload['id']);
            $single = $query->firstOrFail();
            return new PropertyResource($single);
        }

        if ($payload['slug']) {
            $query->where('slug', $payload['slug']);
            $single = $query->firstOrFail();
            return new PropertyResource($single);
        }

        // Filtre par catégorie si spécifiée
        if ($payload['category']) {
            $query->where('category_id', $payload['category']);
        }

        // Filtre par plusieurs catégories si spécifiées
        if ($payload['categories'] && count(explode(',', $payload['categories'])) > 0) {
            $query->whereIn('category_id', explode(',', $payload['categories']));
        }

        if ($payload['created_by']) {
            $query->where('created_by', $payload['created_by']);
        }

        if (isset($payload['location_id']) && $payload['location_id'] !== '*') {
            $query->where('location_id', $payload['location_id']);
        }

        // dd(explode(',', $payload['locations']));
        if (isset($payload['locations']) && count(explode(',', $payload['locations'])) > 0) {
            $query->whereIn('location_id', explode(',', $payload['locations']));
        }

        if (isset($payload['price_sort']) && $payload['price_sort'] !== '*') {
            $query->orderBy('price', $payload['price_sort']);
        }

        if (isset($payload['deposit_price_sort']) && $payload['deposit_price_sort'] !== '*') {
            $query->orderBy('deposit_price', $payload['deposit_price_sort']);
        }

        // Trie par pertinence si demandé
        if ($payload['top_seed']) {
            $query->orderBy('total_click', 'desc');
        } else {
            $query->orderBy('created_at', 'desc');
        }

        // ? if user is not admin no show deleted properties
        // $admin_condition = Utils::userLogged() && Utils::userLogged()->role == 'ADMIN';
        // $query->whereNotIn('status', $admin_condition ? [Utils::STATE_DELETED()] : []);
        $query->whereNotIn('status', [Utils::STATE_DELETED()]);

        // Renvoie les données paginées avec une collection
        $properties = $query->paginate($payload['limit']);

        return PropertyResource::collection($properties);
    }
}
