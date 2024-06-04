<?php

namespace App\Services;

use App\Http\Resources\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class PaginationService
{
    public function paginate($items, $perPage = 10, $page = null, $path = null, $fragment = null)
    {
        $page = $page ?: 1;
        $items = $items instanceof Collection ? $items : collect($items);

        $pagination = new LengthAwarePaginator(
            $items->forPage($page, $perPage),
            $items->count(),
            $perPage,
            $page,
            [
                'path' => $path ?: url('/'),
                'fragment' => $fragment,
            ]
        );

        return [
            // 'data' => $pagination->items(),
            // 'pagination' => $pagination,
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
