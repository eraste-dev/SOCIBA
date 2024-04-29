<?php

/**
 * API routes
 *
 */

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\SliderController;
use App\Http\Controllers\Controller;
use App\Services\ResponseService;

Route::get('/', function () {
    return ResponseService::success([], "Welcome to the Sociba Server API");
});

Route::group(['prefix' => 'api'], function () {
    Route::group(['prefix' => 'v1'], function () {
        Route::resource('sliders', SliderController::class);
    });
});
