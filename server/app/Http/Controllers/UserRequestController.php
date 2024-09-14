<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserRequest;
use App\Services\ResponseService;

class UserRequestController extends Controller
{
    /**
     * Display a listing of the user requests.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $userRequests = UserRequest::all();
        return ResponseService::success($userRequests, 'user requests retrieved successfully');
    }

    /**
     * Store a newly created user request in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'message' => 'nullable|string',
            'others' => 'nullable|string',
            'is_read' => 'boolean',
            'ip_address' => 'nullable|string|max:45',
            'phone' => 'nullable|string|max:20',
            'area' => 'nullable|string|max:100',
            'location' => 'nullable|string|max:100',
            'date' => 'nullable|date',
        ]);

        $userRequest = UserRequest::create($validatedData);
        // return response()->json($userRequest, 201);
        return ResponseService::success($userRequest, 'user request created successfully');
    }

    /**
     * Display the specified user request.
     *
     * @param  \App\Models\UserRequest  $userRequest
     * @return \Illuminate\Http\Response
     */
    public function show(UserRequest $userRequest)
    {
        return response()->json($userRequest);
    }

    /**
     * Update the specified user request in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\UserRequest  $userRequest
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, UserRequest $userRequest)
    {
        $validatedData = $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'message' => 'nullable|string',
            'others' => 'nullable|string',
            'is_read' => 'boolean',
            'ip_address' => 'nullable|string|max:45',
            'phone' => 'nullable|string|max:20',
            'area' => 'nullable|string|max:100',
            'location' => 'nullable|string|max:100',
            'date' => 'nullable|date',
            'type' => 'required|in:REQUEST_MOVING',
        ]);

        $userRequest->update($validatedData);
        return response()->json($userRequest);
    }

    /**
     * Remove the specified user request from storage.
     *
     * @param  \App\Models\UserRequest  $userRequest
     * @return \Illuminate\Http\Response
     */
    public function destroy(UserRequest $userRequest)
    {
        $userRequest->delete();
        return response()->json(null, 204);
    }
}
