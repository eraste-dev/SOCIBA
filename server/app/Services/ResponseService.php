<?php

namespace App\Services;

class ResponseService
{
    /**
     * Returns a JSON response with a success status and the provided data and message.
     *
     * @param mixed $data The data to be included in the response.
     * @param string|null $message An optional message to be included in the response.
     * @return \Illuminate\Http\JsonResponse The JSON response with the success status, data, message, and error.
     */
    public static function success($data, string $message = null, array $pagination = [])
    {
        return response()->json([
            'success' => true,
            'data' => $data,
            'pagination' => $pagination,
            'message' => $message,
            'error' => null,
        ]);
    }

    /**
     * A function that returns a JSON error response.
     *
     * @param mixed $message The error message.
     * @param int $status The HTTP status code for the response. Default is 400.
     * @param array $traces Additional traces for debugging. Default is an empty array.
     * @return \Illuminate\Http\JsonResponse The JSON error response.
     */
    public static function error(
        string $message,
        int $status = 400,
        array|\Illuminate\Support\MessageBag $errors = [],
        array $traces = []
    ) {
        return response()->json([
            'success' => false,
            'data'    => null,
            'message' => $message,
            'error'   => $message,
            'errors'  => $errors,
            'traces'  => $traces,
        ], $status);
    }
}
