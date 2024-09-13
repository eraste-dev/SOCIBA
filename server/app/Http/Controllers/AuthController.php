<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Services\NotificationService;
use App\Services\ResponseService;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Tymon\JWTAuth\Facades\JWTAuth;


class AuthController extends Controller
{
    /**
     * Handle user login
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
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
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        // Validation des données saisies
        $validator = Validator::make($request->all(), [
            'name'              => 'required|string|max:255',
            'last_name'         => 'required|string|max:255',
            'phone'             => 'required|string|max:255',
            'phone_whatsapp'    => 'required|string|max:255',
            'email'             => 'required|string|email|max:255|unique:users',
            'password'          => 'required|string|min:6',
            'status'            => 'nullable|string|in:ACTIVE,INACTIVE,DELETED,REJECTED,PENDING,BLOCKED',
            'type'              => 'nullable|string|inADMIN,USER,GUEST',
            "fonction"          => 'nullable|string|max:255',
            "influence_zone_id" => 'nullable|max:255',
        ]);

        // Si la validation échoue, renvoyer les erreurs
        if ($validator->fails()) {
            return ResponseService::error("Erreur de saisie", 422,  $validator->errors());
        }

        // Création d'un nouvel utilisateur
        $user = User::create([
            'name'              => $request->name,
            'last_name'         => $request->last_name,
            'phone'             => $request->phone,
            'phone_whatsapp'    => $request->phone_whatsapp,
            'email'             => $request->email,
            'password'          => Hash::make($request->password),
            'type'              => $request->type ? $request->type : 'USER',
            'status'            => $request->status ? $request->status : 'ACTIVE',
            'fonction'          => $request->fonction ? $request->fonction : null,
            'influence_zone_id' => $request->influence_zone_id ? $request->influence_zone_id : null,
            'email_verified_at' => now(),
        ]);


        // send notification
        try {
            NotificationService::afterRegistration($user);
        } catch (\Throwable $th) {
            //throw $th;
        }

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
        try {
            $token = JWTAuth::getToken(); // Obtiens le token JWT actuel
            JWTAuth::invalidate($token); // Invalide le token, l'ajoutant à la liste noire
        } catch (\Throwable $th) {
            // return ResponseService::success("Successfully logged out");
        }

        return ResponseService::success("Successfully logged out");
    }

    public function updateUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id'             => 'required|integer|exists:users,id',
            'name'           => 'nullable|string|max:255',
            'last_name'      => 'nullable|string|max:255',
            'phone'          => 'nullable|string|max:255',
            'phone_whatsapp' => 'nullable|string|max:255',
            'password'       => 'nullable|string',
            'type'           => 'nullable|string|in:ADMIN,USER,GUEST',
            'status'         => 'nullable|string|in:ACTIVE,INACTIVE,DELETED,REJECTED,PENDING,BLOCKED',
            'avatar'         => 'nullable|file|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return ResponseService::error("Erreur de mise à jour", 422, $validator->errors());
        }

        try {
            $user = User::findOrFail($request->id);

            $user->fill($request->only([
                'name',
                'last_name',
                'phone',
                'phone_whatsapp',
                'type',
                'status'
            ]));

            if ($request->filled('password')) {
                $user->password = Hash::make($request->password);
            }

            if ($request->hasFile('avatar')) {
                if ($user->avatar) {
                    Storage::disk('public')->delete($user->avatar);
                }
                $user->avatar = $request->file('avatar')->store('avatars', 'public');
            }

            $user->save();
            return ResponseService::success(new UserResource($user), "Successfully updated");
        } catch (\Throwable $th) {
            return ResponseService::error("Failed to update");
        }
    }


    /**
     * Envoie un lien de réinitialisation de mot de passe à l'utilisateur.
     */
    public function sendResetLinkEmail(Request $request)
    {
        $request->validate(['email' => 'required|email|exists:users,email']);

        $status = Password::sendResetLink($request->only('email'));

        if ($status == Password::RESET_LINK_SENT) {
            return ResponseService::success([], __($status));
        }

        return ResponseService::error(__($status), 500);
    }

    /**
     * Réinitialise le mot de passe de l'utilisateur.
     */
    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
            'email' => 'required|email|exists:users,email',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->password = Hash::make($password);
                $user->save();
            }
        );

        if ($status == Password::PASSWORD_RESET) {
            return ResponseService::success([], __($status));
        }

        return ResponseService::error(__($status), 500);
    }

    /**
     * Change le mot de passe de l'utilisateur authentifié.
     */
    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:6|confirmed',
        ]);

        $user = Auth::user();

        if (!Hash::check($request->current_password, $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['Current password is incorrect'],
            ]);
        }

        $user->password = Hash::make($request->new_password);
        // $user->save(); // TODO : fix

        return ResponseService::success([], 'Password changed successfully');
    }
}
