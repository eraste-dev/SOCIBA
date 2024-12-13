<?php

namespace App\Http\Controllers;

use App\Services\ResponseService;

abstract class Controller
{
    public function index()
    {
        return ResponseService::success([], "Welcome to the BAJORAH Server API");
    }

    public function adminIndex()
    {
        return ResponseService::success([], "Welcome to the BAJORAH Server API || ADMIN GUARD ");
    }
}
