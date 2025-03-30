<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\PropertyCategory;
use App\Services\ResponseService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PropertyCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ResponseService::success(PropertyCategory::getByParent(), Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Valider les données de la requête
        $request->validate([
            'id'               => 'nullable|integer|exists:property_categories,id',
            'name'             => 'required|string',
            'parent_id'        => 'nullable|exists:property_categories,id',
            'slug'             => 'nullable|string|unique:property_categories,slug',
            'icon'             => 'nullable|string',
            'description'      => 'nullable|string',
            'type'             => 'nullable|string',
            'uuid'             => 'nullable|string',
            'can_delete'       => 'nullable|boolean',
            'can_upload_image' => 'nullable|boolean',
            // Ajoutez d'autres règles de validation si nécessaire
        ]);

        // Créer une nouvelle catégorie
        try {
            if (isset($request->id)) {
                $category = PropertyCategory::find($request->id);
                $category->update($request->all());
                return ResponseService::success($category, 'Successfully updated category');
            } else {
                $category = PropertyCategory::create($request->all());
                return ResponseService::success($category, 'Successfully created category');
            }
        } catch (\Throwable $th) {
            return ResponseService::error('Failed to create category');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request) {}
}
