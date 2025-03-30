<?php

namespace App\Services;

use App\Models\Property;
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

    public static function afterRegistration(User $user)
    {
        NotificationService::notify(
            $user,
            'Merci de vous être inscrit',
            'Merci de faire confiance à BAJORAH, vous pouvez publier votre première annonce',
            [
                'title'   => 'Nouvel utilisateur',
                'message' => 'Nouvel utilisateur enregisté : ' . $user->name . ' ' . $user->last_name
            ],
            [
                'title'   => 'Nouvel utilisateur',
                'message' => 'Nouvel utilisateur enregisté : ' . $user->name . ' ' . $user->last_name
            ]
        );
    }

    public static function getLabelByProduct(Property $product): string
    {
        $label = "";
        if ($product != null) {
            $label = $product->id;
        }

        return $label;
    }

    public static function afterUpdatePost(Property $product)
    {
        if (auth()->user()->type === "USER") {
            NotificationService::notify(
                auth()->user(),
                'L\'annonce <strong>' . static::getLabelByProduct($product) . '</strong> a été mise à jour',
                'L\'annonce <strong>' . static::getLabelByProduct($product) . '</strong> a été mise à jour',
                [
                    'title'   => 'L\'annonce <strong>' . static::getLabelByProduct($product) . '</strong> a été mise à jour',
                    'message' => 'L\'annonce <strong>' . static::getLabelByProduct($product) . '</strong> a été mise à jour, par ' . auth()->user()->name . ' ' . auth()->user()->last_name,
                ]
            );
        } else {
            NotificationService::notify(
                auth()->user(),
                'L\'annonce <strong>' . static::getLabelByProduct($product) . '</strong> a été mise à jour',
                'L\'annonce <strong>' . static::getLabelByProduct($product) . '</strong> a été mise à jour',
            );
        }
    }

    public static function  afterInsertPost()
    {
        if (auth()->user()->type === "USER") {
            NotificationService::notify(
                auth()->user(),
                'Une nouvelle annonce a été ajoute',
                'Une nouvelle annonce a été ajoute',
                [
                    'title'   => 'Une nouvelle annonce a été ajoute',
                    'message' => 'Une nouvelle annonce a été ajoute,  veuillez valider l\'annonce',
                ]
            );
        } else {
            NotificationService::notify(
                auth()->user(),
                'Une nouvelle annonce a été ajoute',
                'Une nouvelle annonce a été ajoute',
            );
        }
    }
}
