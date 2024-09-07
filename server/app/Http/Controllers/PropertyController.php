<?php

namespace App\Http\Controllers;

use App\Http\Resources\Collection;
use Illuminate\Http\Request;
use App\Models\Property;
use App\Models\PropertyImages;
use App\Services\NotificationService;
use App\Services\ProudctPaginationService;
use App\Services\PropertyService;
use App\Services\ResponseService;
use App\Utils\Utils;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image;

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
            'id'                   => 'nullable|integer|exists:properties,id',
            'title'                => 'nullable|string',
            'category_id'          => 'nullable|integer|exists:property_categories,id',
            'content'              => 'nullable|string',
            'type'                 => 'nullable|string|in:LOCATION,BIEN EN VENTE,RESERVATION,AUTRE"',
            'status'               => 'nullable|string',
            'location_id'          => 'nullable|string|exists:municipalities,id',
            'location_description' => 'nullable|string',
            'price'                => 'nullable|numeric',
            'periodicity'          => 'nullable|string',
            'bathrooms'            => 'nullable|numeric',
            'bedrooms'             => 'nullable|numeric',
            'garages'              => 'nullable|numeric',
            'kitchens'             => 'nullable|numeric',
            'rooms'                => 'nullable|numeric',
            'area'                 => 'nullable|numeric',
            'area_unit'            => 'nullable', // string|in:M,LOT
            'acd'                  => 'nullable|numeric',
            'count_advance'        => 'nullable|numeric',
            'count_monthly'        => 'nullable|numeric',
            'jacuzzi'              => 'nullable|numeric', // |boolean
            'bath'                 => 'nullable|numeric', // |boolean
            'WiFi'                 => 'nullable|numeric', // |boolean
            'pool'                 => 'nullable|numeric', // |boolean
            'air_conditioning'     => 'nullable', // |boolean
            'images.*'             => 'required|file|max:10048',
            // 'excerpt'           => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return ResponseService::error("Erreur d'enregistrement", 422, $validator->errors());
        }

        // Enregistrer les données dans la base de données
        $validatedData = $validator->validated();

        if (isset($validatedData['id'])) {
            // ? UPDATE
            $product = Property::find($validatedData['id']);
            $product->status = $validatedData['status'] ?? $product->status;
            $product->updated_by = auth()->user()->id;

            if (isset($validatedData['title'])) {
                $product->slug = Str::slug($validatedData['title']);
            } else {
                if(isset($validatedData['type'])) {
                    $product->slug = Str::slug($validatedData['type'] . '-' . $product->id);
                }
            }

            $product->update($validatedData);
            NotificationService::afterUpdatePost($product);
        } else {
            // ? CREATION
            $product                       = new Property();

            // 
            $product->status               = 'PENDING';
            $product->slug = isset($validatedData['title']) ? Str::slug($validatedData['title']) : Str::slug($validatedData['type'] . '-' . $product->id);

            // $product->slug                 = Str::slug($validatedData['title']);
            $product->created_by           = auth()->user()->id;

            // $product->title                = $validatedData['title'];
            $product->category_id          = $validatedData['category_id'];
            $product->content              = isset($validatedData['content']) ?? null;
            $product->type                 = $validatedData['type'];
            $product->location_id          = $validatedData['location_id'];
            $product->location_description = $validatedData['location_description'];
            $product->price                = $validatedData['price'];
            $product->periodicity          = isset($validatedData['periodicity']) ? $validatedData['periodicity'] : null;

            // details
            $product->bathrooms            = isset($validatedData['bathrooms']) ? $validatedData['bathrooms'] : null;
            $product->bedrooms             = isset($validatedData['bedrooms']) ? $validatedData['bedrooms'] : null;
            $product->garages              = isset($validatedData['garages']) ? $validatedData['garages'] : null;
            $product->kitchens             = isset($validatedData['kitchens']) ? $validatedData['kitchens'] : null;
            $product->rooms                = isset($validatedData['rooms']) ? $validatedData['rooms'] : null;
            $product->area                 = isset($validatedData['area']) ? $validatedData['area'] : null;
            $product->area_unit            = (!isset($validatedData['area_unit']) || $validatedData['area_unit'] == 0 || !in_array(['LOT', 'M'], $validatedData['area_unit'])) ? null :  $validatedData['area_unit'] ;
            $product->count_advance        = isset($validatedData['count_advance']) ? $validatedData['count_advance'] : null;
            $product->count_monthly        = isset($validatedData['count_monthly']) ? $validatedData['count_monthly'] : null;
            $product->jacuzzi              = isset($validatedData['jacuzzi']) ? $validatedData['jacuzzi'] : null;
            $product->bath                 = isset($validatedData['bath']) ? $validatedData['bath'] : null;
            $product->WiFi                 = isset($validatedData['WiFi']) ? $validatedData['WiFi'] : null;
            $product->pool                 = isset($validatedData['pool']) ? $validatedData['pool'] : null;
            $product->air_conditioning     = isset($validatedData['air_conditioning']) ? boolval($validatedData['air_conditioning']) : null;


            // $product->deposit_price        = $validatedData['deposit_price'];
            // $product->excerpt              = $validatedData['excerpt'];

            $product->save();
            NotificationService::afterInsertPost();
        }

        try {
            if (isset($request->images)) {
                PropertyImages::clearImage($product->id);
                $images = $request->images;
                foreach ($images as $key => $image) {
                    // $filetomove = $image->getClientOriginalName() . "-" . time() . "." . $image->getClientOriginalExtension();
                    $filetomove = $product->id . "__" . time() . "__image"  . "." . $image->getClientOriginalExtension();

                    $destinationPath = public_path('assets/images/products');
                    $image->move($destinationPath, $filetomove);

                    PropertyImages::create([
                        'property_id' => $product->id,
                        'image'       => "/images/products/" . $filetomove
                    ]);
                }
            }
        } catch (\Throwable $th) {
            return ResponseService::error("Product created successfully", 500,);
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

        $images = PropertyImages::where('property_id', $request->id)->get();
        foreach ($images as $key => $image) {
            // $image->delete();
            $image->property_id = null;
            $image->save();
        }
        // $proudct->delete();
        return ResponseService::success(
            PropertyService::search(Property::requestSearch()),
            "Suppression effectuée avec succès"
        );
    }
}
