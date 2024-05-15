<?php

namespace App\Http\Controllers;

use App\Services\ResponseService;

abstract class Controller
{
    public function index()
    {
        return ResponseService::success([], "Welcome to the Sociba Server API");
    }

    public function adminIndex()
    {
        return ResponseService::success([], "Welcome to the Sociba Server API || ADMIN GUARD ");
    }
}
