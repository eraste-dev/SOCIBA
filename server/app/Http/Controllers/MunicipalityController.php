<?php

namespace App\Http\Controllers;

use App\Http\Resources\Collection;
use App\Http\Resources\MunicipalityResource;
use App\Models\Municipality;
use App\Services\ResponseService;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Validator;

class MunicipalityController extends Controller
{
    public function index()
    {
        $municipalities = Municipality::all();
        // $data = Collection::collection($municipalities);
        $data = MunicipalityResource::collection($municipalities);
        return ResponseService::success($data);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'        => 'required|string',
            'slug'        => 'nullable|string',
            'city_id'     => 'required|integer|exists:cities,id',
            'iso3'        => 'nullable|string',
            'iso2'        => 'nullable|string',
            'description' => 'nullable|string',
            'lat'         => 'nullable|numeric',
            'long'        => 'nullable|numeric',
            'thumbnail'   => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return ResponseService::error($validator->errors(), 400, $validator->errors());
        }

        // Enregistrer les données dans la base de données
        $insert = Municipality::create($validator->validated());

        return ResponseService::success($insert, 'Municipality created successfully');
    }
}
