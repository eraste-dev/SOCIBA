<?php

namespace App\Http\Controllers;

use App\Http\Resources\CityResource;
use App\Models\City;
use App\Services\ResponseService;
use Illuminate\Http\Request;

class CityController extends Controller
{
    /**
     * Récupère toutes les villes
     */
    public function index()
    {
        $cities = City::orderBy('name', 'asc')->get();
        $data = CityResource::collection($cities);
        return ResponseService::success($data);
    }

    /**
     * Stocke une nouvelle ville
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'iso3' => 'nullable|string|max:3',
            'iso2' => 'nullable|string|max:2',
            'description' => 'nullable|string',
            'country_id' => 'required|integer|exists:countries,id',
            'lat' => 'nullable|numeric',
            'long' => 'nullable|numeric',
            'thumbnail' => 'nullable|string'
        ]);

        $city = City::create($request->all());
        return ResponseService::success(new CityResource($city), 'Ville créée avec succès');
    }

    /**
     * Affiche une ville spécifique
     */
    public function show($id)
    {
        $city = City::findOrFail($id);
        return ResponseService::success(new CityResource($city));
    }

    /**
     * Met à jour une ville
     */
    public function update(Request $request, $id)
    {
        $city = City::findOrFail($id);
        
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'iso3' => 'nullable|string|max:3',
            'iso2' => 'nullable|string|max:2',
            'description' => 'nullable|string',
            'country_id' => 'required|integer|exists:countries,id',
            'lat' => 'nullable|numeric',
            'long' => 'nullable|numeric',
            'thumbnail' => 'nullable|string'
        ]);

        $city->update($request->all());
        return ResponseService::success(new CityResource($city), 'Ville mise à jour avec succès');
    }

    /**
     * Supprime une ville
     */
    public function destroy($id)
    {
        $city = City::findOrFail($id);
        $city->delete();
        return ResponseService::success(null, 'Ville supprimée avec succès');
    }
}
