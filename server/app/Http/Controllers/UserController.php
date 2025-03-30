<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use App\Models\UserScore;
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

    public function update_score(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer|exists:users,id',
            'score' => 'required|max:5|min:1'
        ]);

        if ($validator->fails()) {
            return ResponseService::error("Resource introuvable", 404, $validator->errors());
        }

        UserScore::create(['user_id' => $request->user_id, 'score' => $request->score]);
        $user = User::find($request->user_id);

        return ResponseService::success(
            ["score" => $user->rating()],
            "Score mis à jour avec succès"
        );
    }
}
