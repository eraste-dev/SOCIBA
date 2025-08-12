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
        $searchParams = Property::requestSearch();
        
        // Logique intelligente pour la recherche commune + quartier
        if ($searchParams['location'] && $searchParams['location_description']) {
            // Première recherche : commune + quartier
            $products = PropertyService::search($searchParams);
            
            // Si aucun résultat, faire une recherche par commune uniquement
            if ($products->count() === 0) {
                \Log::info("Aucun résultat trouvé pour commune '{$searchParams['location']}' + quartier '{$searchParams['location_description']}'. Recherche par commune uniquement.");
                
                // Retirer le quartier de la recherche
                $searchParamsWithoutDistrict = $searchParams;
                $searchParamsWithoutDistrict['location_description'] = null;
                
                $products = PropertyService::search($searchParamsWithoutDistrict);
            }
        } else {
            // Recherche normale
            $products = PropertyService::search($searchParams);
        }

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
            'images.*'             => 'nullable|file|max:10048',
            'existing_images.*'    => 'nullable|string',
            'videos.*'             => 'nullable|file|max:307200',
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
            \Log::info('=== IMAGE UPDATE DEBUG ===');
            \Log::info('Request has images: ' . (isset($request->images) ? 'true' : 'false'));
            \Log::info('Request has existing_images: ' . (isset($request->existing_images) ? 'true' : 'false'));
            \Log::info('Product ID: ' . ($product->id ?? 'NULL'));
            \Log::info('Is update: ' . (isset($validatedData['id']) ? 'true' : 'false'));
            
            if (isset($request->images) || isset($request->existing_images)) {
                // Si c'est une mise à jour (id existe), gérer les images existantes
                if (isset($validatedData['id'])) {
                    // Conserver les images existantes qui ne sont pas supprimées
                    $existingImages = [];
                    if (isset($request->existing_images)) {
                        $existingImages = $request->existing_images;
                        \Log::info('Existing images count: ' . count($existingImages));
                        \Log::info('Existing images: ' . json_encode($existingImages));
                    }
                    
                    // Supprimer toutes les images actuelles
                    PropertyImages::clearImage($product->id);
                    \Log::info('Cleared existing images from database');
                    
                    // Recréer les enregistrements pour les images existantes
                    foreach ($existingImages as $imageUrl) {
                        PropertyImages::create([
                            'property_id' => $product->id,
                            'image'       => $imageUrl
                        ]);
                        \Log::info('Recreated image record: ' . $imageUrl);
                    }
                } else {
                    // Pour une nouvelle création, supprimer toutes les images
                    PropertyImages::clearImage($product->id);
                }
                
                // Ajouter les nouvelles images
                if (isset($request->images)) {
                    $images = $request->images;
                    \Log::info('New images count: ' . count($images));
                    foreach ($images as $key => $image) {
                        $filetomove = $product->id . "__" . time() . "__image" . "__" . $key . "__"  . "." . $image->getClientOriginalExtension();

                        $destinationPath = public_path('assets/images/products');
                        $image->move($destinationPath, $filetomove);

                        PropertyImages::create([
                            'property_id' => $product->id,
                            'image'       => "/images/products/" . $filetomove
                        ]);
                        \Log::info('Created new image: /images/products/' . $filetomove);
                    }
                }
            }
            \Log::info('=== END IMAGE UPDATE DEBUG ===');
        } catch (\Throwable $th) {
            \Log::error('Image update error: ' . $th->getMessage());
            return ResponseService::error("Erreur lors de la gestion des images: " . $th->getMessage(), 500);
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
            'videos.*'  => 'required|file|max:307200',
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

    /**
     * Supprimer une image spécifique d'une propriété
     */
    public function deleteImage(Request $request)
    {
        \Log::info('=== DELETE IMAGE DEBUG ===');
        \Log::info('Request all: ' . json_encode($request->all()));
        \Log::info('Property ID: ' . $request->property_id);
        \Log::info('Image URL: ' . $request->image_url);
        
        $validator = Validator::make($request->all(), [
            'property_id' => 'required|integer|exists:properties,id',
            'image_url' => 'required|string',
        ]);

        if ($validator->fails()) {
            \Log::error('Validation failed: ' . json_encode($validator->errors()));
            return ResponseService::error("Données invalides", 422, $validator->errors());
        }

        try {
            $propertyId = $request->property_id;
            $imageUrl = $request->image_url;

            \Log::info('Looking for image in database...');
            
            // Extraire le chemin relatif de l'URL complète
            $relativePath = $imageUrl;
            if (strpos($imageUrl, '/core/public/assets') !== false) {
                $relativePath = str_replace('https://api.bajorah.com/core/public/assets', '', $imageUrl);
                // $relativePath =  $imageUrl;
            } elseif (strpos($imageUrl, '/assets') !== false) {
                $relativePath = str_replace('https://api.bajorah.com/assets', '', $imageUrl);
                // $relativePath =  $imageUrl;
            } elseif (strpos($imageUrl, 'http') === 0) {
                // Si c'est une URL complète, extraire le chemin après le domaine
                $parsedUrl = parse_url($imageUrl);
                if (isset($parsedUrl['path'])) {
                    $relativePath = $parsedUrl['path'];
                }
            }
            
            \Log::info('Extracted relative path: ' . $relativePath);
            
            // Trouver l'image dans la base de données avec le chemin relatif
            $propertyImage = PropertyImages::where('property_id', $propertyId)
                ->where('image', $relativePath)
                ->first();

            if (!$propertyImage) {
                \Log::error('Image not found in database for property_id: ' . $propertyId . ' and relative_path: ' . $relativePath);
                return ResponseService::error("Image introuvable", 404);
            }

            \Log::info('Image found in database, ID: ' . $propertyImage->id);

            // Supprimer le fichier physique
            $imagePath = public_path('assets' . $relativePath);
            \Log::info('Image path: ' . $imagePath);
            \Log::info('File exists: ' . (file_exists($imagePath) ? 'Yes' : 'No'));
            
            if (file_exists($imagePath)) {
                unlink($imagePath);
                \Log::info('Physical file deleted successfully');
            } else {
                \Log::warning('Physical file not found, but continuing with database deletion');
            }

            // Supprimer l'enregistrement de la base de données
            $propertyImage->delete();
            \Log::info('Database record deleted successfully');

            return ResponseService::success(null, "Image supprimée avec succès");

        } catch (\Throwable $th) {
            \Log::error('Erreur lors de la suppression d\'image: ' . $th->getMessage());
            \Log::error('Stack trace: ' . $th->getTraceAsString());
            return ResponseService::error("Erreur lors de la suppression de l'image", 500);
        }
    }
}
