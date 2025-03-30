<?php

namespace App\Http\Controllers;

use App\Http\Resources\MetaResource;
use Illuminate\Http\Request;
use App\Models\Meta;
use App\Services\ResponseService;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;

class MetaController extends Controller
{

    /**
     * Get the meta by key
     *
     * @param string $key
     * @return \Illuminate\Http\Response
     */
    public function getByKey(Request $request)
    {
        $meta = Meta::where('key', $request->key)->get();
        if ($meta) {
            $metaResource = MetaResource::collection($meta);
            return ResponseService::success($metaResource, 'key found');
        }
        return ResponseService::error('key not found', 404);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $metas = Meta::all();
        return response()->json($metas);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id'    => 'nullable|integer',
            'title' => 'nullable|string|max:255',
            'key' => 'nullable|string|max:255',
            'value' => 'nullable|string|max:255',
            'type' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:255',
            'user_id' => 'nullable|integer',
            'deleted_at' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return ResponseService::error($validator->error_get_last(), 422, $validator->errors());
        }

        $meta = Meta::find($request->input('id'));
        if ($meta) {
            $meta->update($request->all());
        } else {
            $meta = Meta::create($request->all());
        }
        return ResponseService::success(MetaResource::collection($meta), 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $validator = Validator::make(['id' => $id], [
            'id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return ResponseService::error($validator->error_get_last(), 422, $validator->errors());
        }

        $meta = Meta::find($id);
        if (!$meta) {
            return ResponseService::error('Resource not found', 404);
        }

        $meta->update(['deleted_at' => now()]);
        return ResponseService::success(MetaResource::collection($meta), 200);
    }
}
