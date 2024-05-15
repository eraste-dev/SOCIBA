<?php

/**
 * API routes
 *
 */

use App\Http\Controllers\PropertyCategoryController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\MunicipalityController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\PropertyImagesController;
use App\Http\Middleware\JwtMiddleware;
use App\Services\ResponseService;

Route::get('/', function () {
    return ResponseService::success([], "Welcome to the Sociba Server API");
});

Route::group(['prefix' => 'v1'], function () {
    // ? PUBLIC ROUTE
    Route::group(['prefix' => ''], function () {
        Route::resource('sliders', SliderController::class);
        Route::resource('categories', PropertyCategoryController::class);
        Route::group(['prefix' => 'properties'], function () {
            Route::get('/', [PropertyController::class, 'get']);
        });
        Route::group(['prefix' => 'locations'], function () {
            Route::get('/', [MunicipalityController::class, 'index']);
        });
        // Route::resource('property-images', PropertyImagesController::class);
    });

    // * AUTH ROUTE
    Route::group(['prefix' => 'auth'], function () {
        Route::post('login',    [AuthController::class, 'login']);
        Route::post('register', [AuthController::class, 'register']);
        Route::post('logout',   [AuthController::class, 'logout']);
    });

    // ! PROTECTED ROUTE
    Route::group(['prefix' => '/admin', 'middleware' => [JwtMiddleware::class]], function () {
        // Route::get('/', [Controller::class, 'adminIndex'])->name('admin.index');
        Route::group(['prefix' => 'products'], function () {
            Route::post('/', [PropertyController::class, 'store'])->name('admin.products.store');
        });
    });
});
