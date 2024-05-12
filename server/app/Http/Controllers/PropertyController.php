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
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

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
        $validator = Validator::make($request->all(), [
            'title'                => 'required|string',
            'category_id'          => 'required|integer|exists:property_categories,id',
            'excerpt'              => 'required|string',
            'content'              => 'required|string',
            'type'                 => 'required|string|in:ACHAT,VENTE,LOCATION,AUTRE',
            'location_id'          => 'required|string|exists:municipalities,id',
            'location_description' => 'nullable|string',
            'price'                => 'required|numeric',
            'deposit_price'        => 'nullable|numeric',
            'images.*'             => 'image|mimes:jpeg,png,jpg,gif|max:2048', // Validation pour les images
        ]);

        if ($validator->fails()) {
            return ResponseService::error("Erreur d'enregistrement", 422, $validator->errors());
        }

        // Enregistrer les données dans la base de données
        $validatedData = $validator->validated();

        $product = new Property();
        $product->title         = $validatedData['title'];
        $product->slug          = Str::slug($validatedData['title']);
        $product->category_id   = $validatedData['category_id'];
        $product->excerpt       = $validatedData['excerpt'];
        $product->content       = $validatedData['content'];
        $product->type          = $validatedData['type'];
        $product->location_id   = $validatedData['location_id'];
        $product->location_description = $validatedData['location_description'];
        $product->price         = $validatedData['price'];
        $product->deposit_price = $validatedData['deposit_price'];

        // default values
        $product->status = 'PENDING';
        // $product->createSlug(Property::class, 'slug', $validatedData['title']);
        $product->created_by = auth()->user()->id;

        $product->save();
        $insert = $product->refresh();

        // Enregistrer les images
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

        return ResponseService::success($product->refresh(), "Product created successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Property $property)
    {
        //
    }
}
