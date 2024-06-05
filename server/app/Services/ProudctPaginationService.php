<?php

namespace App\Services;

use App\Models\Property;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class ProudctPaginationService
{
    public function paginate($items, $perPage = 10, $page = null, $path = null, $fragment = null)
    {
        $page = $page ?: 1;
        // dd($perPage);
        // $items = $items instanceof Collection ? $items : collect($items);
        request()->limit = 999999999999;
        $count =  PropertyService::search(Property::requestSearch())->count();

        if ($path === null) {
            // Define path for pagination
            $path = request()->path() ?: (env('APP_ENV') === 'production' ? 'https://dev.eebtp-ci.com/' : 'http://localhost:3000/');
        }

        $pagination = new LengthAwarePaginator(
            $items->forPage($page, $perPage),
            $count,  //$items->count(),
            $perPage,
            $page,
            [
                'path' => $path ?: url('/'),
                'fragment' => $fragment,
            ]
        );

        return [
            // 'data' => $pagination->items(),
            'meta' => [
                'current_page' => $pagination->currentPage(),
                'from' => $pagination->firstItem(),
                'last_page' => $pagination->lastPage(),
                'path' => $pagination->path(),
                'per_page' => $pagination->perPage(),
                'to' => $pagination->lastItem(),
                'total' => $pagination->total(),
            ],
            'links' => [
                'first' => $pagination->url(1),
                'last' => $pagination->url($pagination->lastPage()),
                'prev' => $pagination->previousPageUrl(),
                'next' => $pagination->nextPageUrl(),
            ],
            'all_links' => $pagination->linkCollection(),
        ];
    }
}
