<?php

namespace App\Utils;

use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;

class Utils
{
    /**
     * Returns the date format defined in the application configuration.
     *
     * This function checks if the constant 'DATE_FORMAT' is defined and returns its value.
     * If the constant is not defined, it sets the value to 'Y-m-d H:i:s' and returns it.
     *
     * @return string The date format defined in the application configuration.
     */
    static public function DATE_FORMAT()
    {
        if (!defined('DATE_FORMAT')) {
            define('DATE_FORMAT', 'Y-m-d H:i:s');
        }
        return DATE_FORMAT;
    }

    /**
     * Returns the string 'PUBLISH'.
     *
     * @return string The string 'PUBLISH'.
     */
    static public function STATE_PUBLISH(): string
    {
        return 'PUBLISH';
    }

    /**
     * Returns the string 'DRAFT'.
     *
     * @return string The string 'DRAFT'.
     */
    static public function STATE_DRAFT(): string
    {
        return 'DRAFT';
    }

    /**
     * Returns the string 'DELETED'.
     *
     * @return string The string 'DELETED'.
     */
    static public function STATE_DELETED(): string
    {
        return 'DELETED';
    }

    /**
     * Returns the string 'REJECTED'.
     *
     * @return string The string 'REJECTED'.
     */
    static public function STATE_REJECTED(): string
    {
        return 'REJECTED';
    }

    /**
     * Returns the string 'PENDING'.
     *
     * @return string The string 'PENDING'.
     */
    static public function STATE_PENDING(): string
    {
        return 'PENDING';
    }

    /**
     * Returns the string 'BLOCKED'.
     *
     * @return string The string 'BLOCKED'.
     */
    static public function STATE_BLOCKED(): string
    {
        return 'BLOCKED';
    }

    static public function TYPE_LOCATION(): string
    {
        return 'LOCATION';
    }

    static public function TYPE_BIEN_EN_VENTE(): string
    {
        return 'BIEN EN VENTE';
    }

    static public function TYPE_RESERVATION(): string
    {
        return 'RESERVATION';
    }

    /**
     * Retrieves the logged-in user from the token in the request, if it exists and the user's status is not 'ACTIVE'.
     *
     * @return User|false The logged-in user if the status is not 'ACTIVE', or false if there is no token or the user does not exist.
     */
    static public function userLogged(): User | false
    {
        $token = request()->bearerToken();
        if ($token) {
            try {
                $user = JWTAuth::setToken($token)->toUser();
                if ($user->status != 'ACTIVE') {
                    return $user;
                }
            } catch (\Exception $e) {
            }
        }

        return false;
    }

    /**
     * Returns the string 'ADMIN'.
     *
     * @return string The string 'ADMIN'.
     */
    static public function USER_ADMIN(): string
    {
        return 'ADMIN';
    }

    /**
     * Returns the string 'USER'.
     *
     * @return string The string 'USER'.
     */
    static public function USER_DEFAULT(): string
    {
        return 'USER';
    }

    /**
     * Returns the string 'GUEST'.
     *
     * @return string The string 'GUEST'.
     */
    static public function USER_GUEST(): string
    {
        return 'GUEST';
    }
}
