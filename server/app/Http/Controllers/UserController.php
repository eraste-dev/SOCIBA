<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\ResponseService;
use App\Utils\Utils;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function listUsers()
    {
        return ResponseService::success(
            UserResource::collection(User::whereNotIn('status', [Utils::STATE_DELETED()])->get()),
            'users retrieved successfully'
        );
    }

    public function delete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|integer|exists:users,id',
        ]);

        if ($validator->fails()) {
            return ResponseService::error("Resource introuvable", 404, $validator->errors());
        }

        $product = User::find($request->id);
        $product->status  = Utils::STATE_DELETED();
        $product->save();
        // $proudct->delete();
        return ResponseService::success(
            UserResource::collection(User::all()),
            "Suppression effectuée avec succès"
        );
    }
}
