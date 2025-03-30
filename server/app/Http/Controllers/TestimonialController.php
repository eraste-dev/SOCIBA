<?php

namespace App\Http\Controllers;

use App\Http\Resources\TestimonalResource;
use App\Models\Testimonial;
use App\Services\ResponseService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TestimonialController extends Controller
{
    public function get(Request $request)
    {
        try {
            return ResponseService::success(
                TestimonalResource::collection(Testimonial::where('validated', true)->get()),
                "Successfully created"
            );
        } catch (\Throwable $th) {
            return ResponseService::error("Resource introuvable", 404);
        }
    }

    /**
     * Renvoie toutes les t moignages.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function getAll(Request $request)
    {
        try {
            return ResponseService::success(
                TestimonalResource::collection(Testimonial::all()),
                "Successfully created"
            );
        } catch (\Throwable $th) {
            return ResponseService::error("Resource introuvable", 404);
        }
    }

    /**
     * Save a testimonial to the server.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function save(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id'        => 'nullable|integer|exists:testimonials,id',
            'user_id'   => 'required|integer|exists:users,id',
            'message'   => 'string',
            'validated' => 'boolean',
        ]);

        if ($validator->fails()) {
            return ResponseService::error("Resource introuvable", 404, $validator->errors());
        }


        if (isset($request->id)) {
            $testimonial = Testimonial::find($request->id);
            if (!$testimonial) {
                return ResponseService::error("Resource introuvable", 404);
            }
            $testimonial->update($request->all());
        } else {
            $testimonial = Testimonial::create($request->all());
        }

        return ResponseService::success(
            new TestimonalResource($testimonial),
            "Successfully created"
        );
    }
}
