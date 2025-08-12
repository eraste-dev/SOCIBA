<?php

namespace App\Http\Controllers;

use App\Http\Resources\Collection;
use App\Models\City;
use App\Services\ResponseService;

class CityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cities = City::all();
        $data = Collection::collection($cities);
        return ResponseService::success($data);
    }
}
