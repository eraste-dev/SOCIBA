<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Services\ResponseService;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;


class AuthController extends Controller
{
    /**
     * Handle user login
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if (!$token = JWTAuth::attempt($credentials)) {
            return ResponseService::error(__('auth.unauthorized'), 401);
        }

        $user   = new UserResource(User::where('email', $request->email)->firstOrFail());
        $expire = time() + JWTAuth::factory()->getTTL() * 60;
        return ResponseService::success(compact('token', 'user', 'expire'));
    }

    /**
     * Handle user registration
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        // Validation des données saisies
        $validator = Validator::make($request->all(), [
            'name'       => 'required|string|max:255',
            'last_name'  => 'required|string|max:255',
            'phone'      => 'required|string|max:255',
            'phone_whatsapp'      => 'required|string|max:255',
            'email'      => 'required|string|email|max:255|unique:users',
            'password'   => 'required|string|min:6',
            'status'     => 'nullable|string|max:255',
            'type'     => 'nullable|string|max:255'
        ]);

        // Si la validation échoue, renvoyer les erreurs
        if ($validator->fails()) {
            return ResponseService::error("Erreur de saisie", 422,  $validator->errors());
        }

        // Création d'un nouvel utilisateur
        $user = User::create([
            'name'       => $request->name,
            'last_name'  => $request->last_name,
            'phone'      => $request->phone,
            'email'      => $request->email,
            'password'   => Hash::make($request->password),
            'type'       => $request->type ? $request->type : 'USER',
            'status'     => $request->status ? $request->status : 'ACTIVE',
        ]);

        // Générer le token JWT pour l'utilisateur nouvellement enregistré
        $token = JWTAuth::fromUser($user);
        $user = new UserResource($user);
        $expire = time() + JWTAuth::factory()->getTTL() * 60;
        return ResponseService::success(compact('token', 'user', 'expire'), "Successfully registered and logged in");
    }

    /**
     * Handle user logout
     *
     * @return \Illuminate\Http\Response
     */
    public function logout()
    {
        $token = JWTAuth::getToken(); // Obtiens le token JWT actuel
        JWTAuth::invalidate($token); // Invalide le token, l'ajoutant à la liste noire

        return ResponseService::success("Successfully logged out");
    }
}
