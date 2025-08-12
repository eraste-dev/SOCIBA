<?php

namespace App\Http\Middleware;

use App\Services\ResponseService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class JwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        if (!$token) {
            return ResponseService::error('Unauthorized, token not found', 401);
        }

        try {
            $user = JWTAuth::setToken($token)->toUser();

            if ($user->status != 'ACTIVE') {
                return ResponseService::error('Unauthorized, user not active', 403);
            }
            
            // Définir l'utilisateur dans le contexte d'authentification
            \Auth::setUser($user);
        } catch (\Exception $e) {
            return ResponseService::error('INVALID_TOKEN', 403);
        }

        return $next($request);
    }
}
