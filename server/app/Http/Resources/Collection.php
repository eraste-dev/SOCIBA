<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class Collection extends ResourceCollection
{
    public function toArray($request)
    {
        // dd($this->collection);

        return [
            'data' => $this->collection,
            'links' => [
                'first' => $this->collection->url(1),
            ],
        ];


        // return [
        //     'data' => $this->collection,
        //     'links' => [
        //         'first' => $this->resource->url(1),
        //         'last' => $this->resource->url($this->resource->lastPage()),
        //         'prev' => $this->resource->previousPageUrl(),
        //         'next' => $this->resource->nextPageUrl(),
        //     ],
        //     'meta' => [
        //         'current_page' => $this->resource->currentPage(),
        //         'from' => $this->resource->firstItem(),
        //         'last_page' => $this->resource->lastPage(),
        //         'path' => $this->resource->path(),
        //         'per_page' => $this->resource->perPage(),
        //         'to'       => $this->resource->lastItem(),
        //         'total'    => $this->resource->total(),
        //     ],
        // ];
    }
}
