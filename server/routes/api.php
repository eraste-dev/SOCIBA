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
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MunicipalityController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\PropertyImagesController;
use App\Http\Middleware\JwtMiddleware;
use App\Services\ResponseService;

// Route::get('/', [HomeController::class, 'index']);

Route::group(['prefix' => 'v1'], function () {
    Route::get('/', [HomeController::class, 'index']);

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
    Route::group(['middleware' => [JwtMiddleware::class]], function () {
        // ? PROTECTED PRODUCTS ROUTES
        Route::group(['prefix' => '/admin'], function () {
            Route::group(['prefix' => 'products'], function () {
                Route::post('/', [PropertyController::class, 'store'])->name('admin.products.store');
                Route::delete('/', [PropertyController::class, 'delete'])->name('admin.products.delete');
            });
        });

        // ? PROTECTED USER ROUTES
        Route::group(['prefix' => '/user'], function () {
            Route::put('update-profile',   [AuthController::class, 'updateUser'])->name('user.update-profile');
        });
    });
});
