<?php

namespace App\Http\Controllers;

use App\Http\Resources\Collection;
use Illuminate\Http\Request;
use App\Models\Property;
use App\Models\PropertyImages;
use App\Services\ProudctPaginationService;
use App\Services\PropertyService;
use App\Services\ResponseService;
use App\Utils\Utils;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class PropertyController extends Controller
{
    private $limit_product = 9999999999999;

    /**
     * Display a listing of the resource.
     */
    public function get(Request $request)
    {
        $paginationService = new ProudctPaginationService;
        $products = PropertyService::search(Property::requestSearch());
        // dd($products);

        return ResponseService::success(
            $products,
            Response::HTTP_OK,
            $paginationService->paginate($products, $request->limit ?? $this->limit_product, $request->page ?? 1, null, null),
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id'                  => 'nullable|integer|exists:properties,id',
            'title'                => 'nullable|string',
            'category_id'          => 'nullable|integer|exists:property_categories,id',
            'excerpt'              => 'nullable|string',
            'content'              => 'nullable|string',
            'type'                 => 'nullable|string|in:ACHAT,VENTE,LOCATION,AUTRE',
            'status'              => 'nullable|string', // TODO : definie in : xxx, xxx, xx
            'location_id'          => 'nullable|string|exists:municipalities,id',
            'location_description' => 'nullable|string',
            'price'                => 'nullable|numeric',
            'deposit_price'        => 'nullable|numeric',
            'images.*'             => 'image|mimes:jpeg,png,jpg,gif|max:2048', // Validation pour les images
        ]);

        if ($validator->fails()) {
            return ResponseService::error("Erreur d'enregistrement", 422, $validator->errors());
        }

        // Enregistrer les données dans la base de données
        $validatedData = $validator->validated();

        if ($validatedData['id']) {
            // ? UPDATE
            $product = Property::find($validatedData['id']);
            $product->status = $validatedData['status'] ?? $product->status;
            $product->updated_by = auth()->user()->id;
            if (isset($validatedData['title'])) $product->slug = Str::slug($validatedData['title']);

            $product->update($validatedData);
        } else {
            // ? CREATION
            $product = new Property();
            $product->status = 'PENDING';
            $product->slug                 = Str::slug($validatedData['title']);
            $product->created_by           = auth()->user()->id;
            $product->title                = $validatedData['title'];
            $product->category_id          = $validatedData['category_id'];
            $product->excerpt              = $validatedData['excerpt'];
            $product->content              = $validatedData['content'];
            $product->type                 = $validatedData['type'];
            $product->location_id          = $validatedData['location_id'];
            $product->location_description = $validatedData['location_description'];
            $product->price                = $validatedData['price'];
            $product->deposit_price        = $validatedData['deposit_price'];

            $product->save();
        }


        return ResponseService::success($product->refresh(), "Product created successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|integer|exists:properties,id',
        ]);

        if ($validator->fails()) {
            return ResponseService::error("Resource introuvable", 404, $validator->errors());
        }

        $product = Property::find($request->id);
        $product->status  = Utils::STATE_DELETED();
        $product->save();
        // $proudct->delete();
        return ResponseService::success(
            PropertyService::search(Property::requestSearch()),
            "Suppression effectuée avec succès"
        );
    }
}
