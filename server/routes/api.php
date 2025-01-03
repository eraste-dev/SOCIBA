<?php

/**
 * API routes
 *
 */

use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PropertyCategoryController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MetaController;
use App\Http\Controllers\MunicipalityController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserRequestController;
use App\Http\Middleware\JwtMiddleware;

// Route::get('/', [HomeController::class, 'index']);

Route::group(['prefix' => 'v1'], function () {
    Route::get('/', [HomeController::class, 'index']);
    Route::group(['prefix' => '/settings'], function () {
        Route::get('/', [SettingsController::class, 'index']);
    });

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

        // ? META
        Route::get('meta/{key}', [MetaController::class, 'getByKey']);
        // Route::resource('meta', MetaController::class);

        // ? USER REQUEST
        Route::group(['prefix' => 'user'], function () {
            Route::post('send-request', [UserRequestController::class, 'store']);
            Route::post('update-score', [UserController::class, 'update_score'])->name('user.update_score');
        });

        Route::group(['prefix' => 'testimonials'], function () {
            Route::get('/', [TestimonialController::class, 'get']);
        });
    });

    // * AUTH ROUTE
    Route::group(['prefix' => 'auth'], function () {
        Route::post('login',    [AuthController::class, 'login']);
        Route::post('register', [AuthController::class, 'register']);
        Route::post('logout',   [AuthController::class, 'logout']);
        Route::post('/password/email', [AuthController::class, 'sendResetLinkEmail']);
        Route::post('/password/reset', [AuthController::class, 'resetPassword']);
        Route::post('/password/change', [AuthController::class, 'changePassword'])->middleware([JwtMiddleware::class]);
    });

    // ! PROTECTED ROUTE
    Route::group(['middleware' => [JwtMiddleware::class]], function () {
        // ? SETTINGS ROUTES
        Route::group(['prefix' => '/settings'], function () {
            Route::post('update', [SettingsController::class, 'store']);
            Route::post('update-logo', [SettingsController::class, 'change_logo']);
        });

        // ? PROTECTED PRODUCTS ROUTES
        Route::group(['prefix' => '/admin'], function () {
            Route::post('sliders', [SliderController::class, 'store']);
            Route::delete('sliders', [SliderController::class, 'destroy']);

            Route::group(['prefix' => 'products'], function () {
                Route::post('/',                [PropertyController::class, 'store'])->name('admin.products.store');
                Route::delete('/',              [PropertyController::class, 'delete'])->name('admin.products.delete');
                Route::post('/upload-video',    [PropertyController::class, 'upload_video'])->name('admin.products.upload_video');
            });
        });

        // Testimonial
        Route::group(['prefix' => 'testimonials'], function () {
            Route::post('/', [TestimonialController::class, 'save']);
            Route::get('/all', [TestimonialController::class, 'getAll']);
        });

        // ? PROTECTED USER ROUTES
        Route::group(['prefix' => '/user'], function () {
            // posts
            Route::get('/user-posts', [PropertyController::class, 'getUserPost']);

            Route::put('update-profile',   [AuthController::class, 'updateUser'])->name('user.update-profile');
            Route::put('change-password',   [AuthController::class, 'changePassword'])->name('user.change-password');
            Route::get('list',             [UserController::class, 'listUsers'])->name('user.list');
            Route::delete('delete',        [UserController::class, 'delete'])->name('user.delete');

            // NOTIFICATION USER
            Route::get('notifications',                     [NotificationController::class, 'index'])->name('user.notifications');
            Route::get('/notifications/unread',             [NotificationController::class, 'unread']);
            Route::post('/notifications/{id}/mark-as-read', [NotificationController::class, 'markAsRead']);
            Route::delete('/notifications/{id}',            [NotificationController::class, 'destroy']);
            Route::post('/notifications/mark-all-as-read',  [NotificationController::class, 'markAllAsRead']);

            // ? USER REQUEST
            Route::get('user-request', [UserRequestController::class, 'index']);
        });
    });
});
