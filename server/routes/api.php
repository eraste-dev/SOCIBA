<?php

/**
 * API routes
 *
 */

use App\Http\Controllers\API\PropertyCategoryController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\SliderController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\PropertyImagesController;
use App\Services\ResponseService;

Route::get('/', function () {
    return ResponseService::success([], "Welcome to the Sociba Server API");
});

Route::group(['prefix' => 'v1'], function () {
    // ? PUBLIC ROUTE
    Route::resource('sliders', SliderController::class);
    Route::resource('categories', PropertyCategoryController::class);
    Route::group(['prefix' => 'properties'], function () {
        Route::get('/', [PropertyController::class, 'get']);
    });
    // Route::resource('property-images', PropertyImagesController::class);

    // * AUTH ROUTE

    // AUTH
    Route::post('auth/login',    [AuthController::class, 'login']);
    Route::post('auth/register', [AuthController::class, 'register']);
    Route::post('auth/logout',   [AuthController::class, 'logout']);

    // ! PROTECED ROUTE

});
