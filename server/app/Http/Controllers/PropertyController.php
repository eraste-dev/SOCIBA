<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Property;
use App\Models\PropertyImages;
use App\Services\NotificationService;
use App\Services\ProudctPaginationService;
use App\Services\PropertyService;
use App\Services\ResponseService;
use App\Utils\Utils;
use Illuminate\Http\Response;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class PropertyController extends Controller
{
    private $limit_product = 9999999999999;


    /**
     * Handles the HTTP GET request for retrieving properties.
     *
     * @param Request $request The HTTP request object
     * @return ResponseService::success() A successful HTTP response with paginated properties
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

    public function getUserPost(Request $request)
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
            'location_id'          => 'nullable|string', // |exists:municipalities,id
            'unlisted_city'        => 'nullable|string',
            'location_description' => 'nullable|string',
            'price'                => 'nullable|numeric',
            'price_second'         => 'nullable|numeric',
            'periodicity'          => 'nullable|string',
            'bathrooms'            => 'nullable|numeric',
            'bedrooms'             => 'nullable|numeric',
            'garages'              => 'nullable|numeric',
            'kitchens'             => 'nullable|numeric',
            'rooms'                => 'nullable|numeric',
            'area'                 => 'nullable|numeric',
            'area_unit'            => 'nullable', // string|in:M,LOT
            'acd'                  => 'nullable',
            'site_approved'        => 'nullable',
            'count_advance'        => 'nullable',
            'count_monthly'        => 'nullable',
            'home_type'            => 'nullable|string',
            'home_type_more'       => 'nullable|string',
            'jacuzzi'              => 'nullable', // |boolean
            'bath'                 => 'nullable', // |boolean
            'WiFi'                 => 'nullable', // |boolean
            'pool'                 => 'nullable', // |boolean
            'area_count'           => 'nullable', // |boolean
            'air_conditioning'     => 'nullable', // |boolean
            'security'             => 'nullable|in:WITH_GUARD,WITHOUT_GUARD',
            'purchase_power'       => 'nullable|in:LESS_EXPENSIVE,EQUAL_EXPENSIVE,MORE_EXPENSIVE',
            'accessibility'        => 'nullable|in:NOT_FAR_FROM_THE_TAR,A_LITTLE_FAR_FROM_THE_TAR,FAR_FROM_THE_TAR',
            'images.*'             => 'required|file|max:10048',
            'videos.*'             => 'required|file|max:10024',
            // 'excerpt'           => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return ResponseService::error($validator->errors()->first(), 422, $validator->errors());
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
                if (isset($validatedData['type'])) {
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
            $product->content              = isset($validatedData['content']) && $validatedData['content'] !==  0 && $validatedData['content'] !== 1 ? $validatedData['content'] : null;
            $product->type                 = $validatedData['type'];
            $product->location_id          = (isset($validatedData['location_id']) && $validatedData['location_id'] != 0 && $validatedData['location_id'] != "0") ? $validatedData['location_id'] : null;
            $product->unlisted_city        = isset($validatedData['unlisted_city']) ? $validatedData['unlisted_city'] : null;
            $product->location_description = $validatedData['location_description'];
            $product->price                = $validatedData['price'];
            $product->price_second         =  isset($validatedData['price_second']) ? $validatedData['price'] : null;
            $product->periodicity          = isset($validatedData['periodicity']) ? $validatedData['periodicity'] : null;

            // details
            $product->bathrooms            = isset($validatedData['bathrooms']) ? $validatedData['bathrooms'] : null;
            $product->bedrooms             = isset($validatedData['bedrooms']) ? $validatedData['bedrooms'] : null;
            $product->garages              = isset($validatedData['garages']) ? $validatedData['garages'] : null;
            $product->kitchens             = isset($validatedData['kitchens']) ? $validatedData['kitchens'] : null;
            $product->rooms                = isset($validatedData['rooms']) ? $validatedData['rooms'] : null;
            $product->area                 = isset($validatedData['area']) ? $validatedData['area'] : null;
            $product->area_count           = isset($validatedData['area_count']) ? $validatedData['area_count'] : null;
            $product->area_unit            = (!isset($validatedData['area_unit']) || $validatedData['area_unit'] == 0 || !in_array($validatedData['area_unit'], ['LOT', 'M'])) ? null :  $validatedData['area_unit'];
            $product->count_advance        = isset($validatedData['count_advance']) ? $validatedData['count_advance'] : null;
            $product->count_monthly        = isset($validatedData['count_monthly']) ? $validatedData['count_monthly'] : null;
            $product->jacuzzi              = isset($validatedData['jacuzzi']) ? $validatedData['jacuzzi'] : null;
            $product->bath                 = isset($validatedData['bath']) ? $validatedData['bath'] : null;
            $product->WiFi                 = isset($validatedData['WiFi']) ? $validatedData['WiFi'] : null;
            $product->pool                 = isset($validatedData['pool']) ? $validatedData['pool'] : null;
            $product->acd                  = isset($validatedData['acd']) ? intval($validatedData['acd']) : null;
            $product->site_approved        = isset($validatedData['site_approved']) ? intval($validatedData['site_approved']) : null;
            $product->air_conditioning     = isset($validatedData['air_conditioning']) ? boolval($validatedData['air_conditioning']) : null;
            $product->home_type            = isset($validatedData['home_type']) ? ($validatedData['home_type']) : null;
            $product->home_type_more       = isset($validatedData['home_type_more']) ? ($validatedData['home_type_more']) : null;
            $product->security             = isset($validatedData['security']) ? $validatedData['security'] : null;
            $product->purchase_power       = isset($validatedData['purchase_power']) ? $validatedData['purchase_power'] : null;
            $product->accessibility        = isset($validatedData['accessibility']) ? $validatedData['accessibility'] : null;


            // $product->deposit_price        = $validatedData['deposit_price'];
            // $product->excerpt              = $validatedData['excerpt'];

            $product->save();
            NotificationService::afterInsertPost();
        }

        // upload images
        try {
            if (isset($request->images)) {
                PropertyImages::clearImage($product->id);
                $images = $request->images;
                foreach ($images as $key => $image) {
                    // $filetomove = $image->getClientOriginalName() . "-" . time() . "." . $image->getClientOriginalExtension();
                    $filetomove = $product->id . "__" . time() . "__image" . "__" . $key . "__"  . "." . $image->getClientOriginalExtension();

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

        // upload videos
        try {
            PropertyService::upload_video($product);
        } catch (\Throwable $th) {
            return ResponseService::error("Product created successfully", 500,);
        }


        return ResponseService::success($product->refresh(), "Product created successfully");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function upload_video(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id'        => 'nullable|integer|exists:properties,id',
            'videos.*'  => 'required|file|max:10024',
        ]);

        if ($validator->fails()) {
            return ResponseService::error($validator->errors()->first(), 422, $validator->errors());
        }

        $videos = [];
        try {
            $videos = PropertyService::upload_unassigned_video();
            return ResponseService::success($videos, "Upload video successfully");
        } catch (\Throwable $th) {
            return ResponseService::error("Cannot upload video", 500,);
        }

        return ResponseService::error("Bad request", 400, $validator->errors());
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
