<?php

namespace App\Services;

use App\Models\User;
use App\Notifications\Notifications;

class NotificationService
{
    public static function notify(
        User $user,
        string $title = '',
        string $message = '',
        array|null $notifyAdmins = null
    ) {
        if ($notifyAdmins != null && isset($notifyAdmins['title']) && isset($notifyAdmins['message'])) {
            static::notifyAdmins($notifyAdmins['title'], $notifyAdmins['message']);
        }
        $user->notify(new Notifications($title, $message, ['user_id' => $user->id]));
    }

    public static function notifyAdmins(string $title = '', string $message = '')
    {
        foreach (User::where('type', 'ADMIN')->get() as $admin) {
            static::notify($admin, $title, $message);
        }
    }

    public static function notifyUsers(
        string $title = '',
        string $message = '',
        array|null $notifyAdmins = null
    ) {
        if ($notifyAdmins != null && isset($notifyAdmins['title']) && isset($notifyAdmins['message'])) {
            static::notifyAdmins($notifyAdmins['title'], $notifyAdmins['message']);
        }

        foreach (User::where('type', 'USER')->get() as $user) {
            static::notify($user, $title, $message);
        }
    }
}
