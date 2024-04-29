<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Slider;
use App\Services\ResponseService;
use App\Http\Resources\SliderCollection;
use App\Http\Resources\SliderResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SliderController extends Controller
{
    /**
     * Récupérer tous les sliders
     *
     * @param
     * @throws
     * @return
     */
    public function index()
    {
        // return new SliderCollection(Slider::paginate(3));

        $sliders = Slider::all();
        // Utiliser la ressource pour formater la collection de sliders
        $data = SliderResource::collection($sliders);
        return ResponseService::success($data);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title'      => 'required|string',
            'description' => 'required|string',
            'image'      => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return ResponseService::error($validator->errors(), 400);
        }

        $imagePath = $request->file('image')->store('sliders'); // Stocke l'image dans le dossier "sliders"

        $slider = new Slider();
        $slider->title = $request->title;
        $slider->description = $request->description;
        $slider->imageUrl = $imagePath; // Enregistre le chemin de l'image dans la base de données

        $slider->save();

        return ResponseService::success($slider, 'Slider created successfully');
    }

    public function show($id)
    {
        // Récupérer un slider par son ID
        $slider = Slider::findOrFail($id);
        return ResponseService::success($slider);
    }

    public function update(Request $request, $id)
    {
        // Validation des données entrantes
        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'description' => 'required|string',
            'imageUrl' => 'required|url',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        // Mettre à jour le slider
        $slider = Slider::findOrFail($id);
        $slider->update($request->all());
        return response()->json(['data' => $slider]);
    }

    public function destroy($id)
    {
        // Supprimer un slider par son ID
        $slider = Slider::findOrFail($id);
        $slider->delete();
        return ResponseService::success($slider, 'Slider deleted successfully');
    }
}
