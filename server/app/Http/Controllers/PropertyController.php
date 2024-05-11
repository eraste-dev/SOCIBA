<?php

namespace App\Http\Controllers;

use App\Http\Resources\Collection;
use Illuminate\Http\Request;
use App\Models\Property;
use App\Models\PropertyImages;
use App\Services\PropertyService;
use App\Services\ResponseService;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class PropertyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function get(Request $request)
    {
        $payload = [
            'id'         => $request->id ?? null,
            'slug'       => $request->slug ?? null,
            'category'   => $request->category ?? null,
            'categories' => $request->categories ?? null,
            'top_seed'   => $request->top ?? false,
            'limit'      => $request->limit ?? 84,
        ];

        return ResponseService::success(PropertyService::search($payload), Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Valider les données de la requête
        $validatedData = $request->validate([
            'title'         => 'required|string',
            'category_id'   => 'required|integer',
            'excerpt'       => 'required|string',
            'content'       => 'required|string',
            'property_type' => 'required|string',
            'city'          => 'required|string',
            'state'         => 'required|string',
            'price'         => 'required|numeric',
            'deposit_price' => 'required|numeric',
            'images.*'      => 'image|mimes:jpeg,png,jpg,gif|max:2048', // Validation pour les images
        ]);

        // Enregistrer les données dans la base de données
        $product = new Property();
        $product->title         = $validatedData['title'];
        $product->slug          = Str::slug($validatedData['title']);
        $product->category_id   = $validatedData['category_id'];
        $product->excerpt       = $validatedData['excerpt'];
        $product->content       = $validatedData['content'];
        $product->property_type = $validatedData['property_type'];
        $product->city          = $validatedData['city'];
        $product->state         = $validatedData['state'];
        $product->price         = $validatedData['price'];
        $product->deposit_price = $validatedData['deposit_price'];

        $product->save();
        $insert = $product->refresh();

        if ($request->hasFile('images')) {
            $imageUrls = [];
            foreach ($request->file('images') as $key => $image) {
                if ($image->store('images')) {
                    $productImage = new PropertyImages();
                    $productImage->property_id = $insert->id;
                    $productImage->image = $image->hashName();
                    $productImage->featured_image = $key == 0 ? true : false;
                    $productImage->save();
                }
                // $imageUrls[] = Storage::url($path);
            }
            // $product->images = $imageUrls;
        }

        return ResponseService::success($product->refresh(), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Property $property)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Property $property)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Property $property)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Property $property)
    {
        //
    }
}
