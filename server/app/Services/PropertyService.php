<?php

namespace App\Services;

use App\Http\Resources\Collection;
use App\Http\Resources\PropertyResource;
use App\Models\Property;

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
        if ($payload['categories']) {
            $query->whereIn('category_id', $payload['categories']);
        }

        // Trie par pertinence si demandé
        if ($payload['top_seed']) {
            // Ajoutez votre logique de tri ici
            $query->orderBy('total_click', 'desc');
        } else {
            $query->orderBy('created_at', 'desc');
        }

        // Renvoie les données paginées avec une collection
        $properties = $query->paginate($payload['limit']);

        // Transformer les données avec la ressource PropertyResource
        return PropertyResource::collection($properties);
        // return Collection::make($properties)->response()->getData(true);
    }
}
