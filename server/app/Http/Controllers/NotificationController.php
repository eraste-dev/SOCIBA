<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\ResponseService;
use App\Utils\Utils;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class NotificationController extends Controller
{
    /**
     * Affiche toutes les notifications de l'utilisateur authentifié.
     */
    public function index()
    {
        $user = Auth::user();
        if ($user) {
            return ResponseService::success($user->notifications);
        }

        return ResponseService::error('user not found', Response::HTTP_NOT_FOUND);
    }

    /**
     * Affiche toutes les notifications non lues de l'utilisateur authentifié.
     */
    public function unread()
    {
        $user = Auth::user();
        return response()->json([
            'unread_notifications' => $user->unreadNotifications,
        ]);
    }

    /**
     * Marque une notification spécifique comme lue.
     *
     * @param  string  $id
     */
    public function markAsRead($id)
    {
        $user = Auth::user();
        $notification = $user->notifications()->where('id', $id)->first();

        if ($notification) {
            $notification->markAsRead();
            return ResponseService::success('Notification marked as read');
        }

        return ResponseService::error('Notification not found', Response::HTTP_NOT_FOUND);
    }

    /**
     * Supprime une notification spécifique.
     *
     * @param  string  $id
     */
    public function destroy($id)
    {
        $user = Auth::user();
        $notification = $user->notifications()->where('id', $id)->first();

        if ($notification) {
            $notification->delete();
            return ResponseService::success('Notification deleted');
        }

        return ResponseService::error('Notification not found', Response::HTTP_NOT_FOUND);
    }

    /**
     * Marque toutes les notifications comme lues.
     */
    public function markAllAsRead()
    {
        $user = Auth::user();
        $user->unreadNotifications->markAsRead();
        return ResponseService::success('Notification marked as read');
    }
}
