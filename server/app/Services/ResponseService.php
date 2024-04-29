<?php

namespace App\Services;

class ResponseService
{
    public static function success($data, $message = null)
    {
        return response()->json([
            'success' => true,
            'data' => $data,
            'message' => $message,
            'error' => null,
        ]);
    }

    public static function error($message, $status = 400)
    {
        return response()->json([
            'success' => false,
            'data' => null,
            'message' => $message,
            'error' => $message,
        ], $status);
    }
}
