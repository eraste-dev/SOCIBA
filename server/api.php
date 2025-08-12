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
use App\Http\Controllers\CityController;

Route::group(['prefix' => 'v1'], function () {
    Route::get('/', [HomeController::class, 'index']);
    
    // SETTINGS ROUTES (PUBLIC)
    Route::group(['prefix' => '/settings'], function () {
        Route::get('/', [SettingsController::class, 'index']);
    });

    // ========================================
    // PUBLIC ROUTES (pas de middleware)
    // ========================================
    Route::group(['prefix' => ''], function () {
        // SLIDERS - Route publique pour récupérer les sliders
        Route::get('sliders', [SliderController::class, 'index']);

        // CATEGORIES - Route publique pour récupérer les catégories
        Route::get('categories', [PropertyCategoryController::class, 'index']);

        // PROPERTIES - Route publique pour récupérer les propriétés
        Route::group(['prefix' => 'properties'], function () {
            Route::get('/', [PropertyController::class, 'get']);
        });

        // LOCATIONS - Route publique pour récupérer les localisations
        Route::group(['prefix' => 'locations'], function () {
            Route::get('/', [MunicipalityController::class, 'index']);
        });

        // CITIES - Route publique pour récupérer les villes
        Route::group(['prefix' => 'cities'], function () {
            Route::get('/', [CityController::class, 'index']);
        });

        // META - Route publique pour récupérer les métadonnées
        Route::get('meta/{key}', [MetaController::class, 'getByKey']);

        // USER REQUEST - Route publique pour les demandes utilisateur
        Route::group(['prefix' => 'user'], function () {
            Route::post('send-request', [UserRequestController::class, 'store']);
            // Route::post('update-score', [UserController::class, 'update_score'])->name('user.update_score'); // COMMENTÉ - doublon de nom
        });

        // TESTIMONIALS - Route publique pour récupérer les témoignages
        Route::group(['prefix' => 'testimonials'], function () {
            Route::get('/', [TestimonialController::class, 'get']);
        });
    });

    // ========================================
    // AUTH ROUTES (authentification)
    // ========================================
    Route::group(['prefix' => 'auth'], function () {
        Route::post('login',    [AuthController::class, 'login']);
        Route::post('register', [AuthController::class, 'register']);
        Route::post('logout',   [AuthController::class, 'logout']);
        Route::post('/password/email', [AuthController::class, 'sendResetLinkEmail']);
        Route::post('/password/reset', [AuthController::class, 'resetPassword']);
        Route::post('/password/change', [AuthController::class, 'changePassword'])->middleware([JwtMiddleware::class]);
    });

    // ========================================
    // PROTECTED ROUTES (avec middleware JWT)
    // ========================================
    Route::group(['middleware' => [JwtMiddleware::class]], function () {
        
        // SETTINGS ROUTES (PROTECTED)
        Route::group(['prefix' => '/settings'], function () {
            Route::post('update', [SettingsController::class, 'store']);
            Route::post('update-logo', [SettingsController::class, 'change_logo']);
        });

        // ADMIN ROUTES (PROTECTED)
        Route::group(['prefix' => '/admin'], function () {
            // SLIDERS ADMIN
            Route::post('sliders', [SliderController::class, 'store']);
            Route::delete('sliders', [SliderController::class, 'destroy']);

            // PRODUCTS ADMIN
            Route::group(['prefix' => 'products'], function () {
                Route::post('/',                [PropertyController::class, 'store']); // ->name('admin.products.store'); // COMMENTÉ - doublon de nom
                Route::delete('/',              [PropertyController::class, 'delete']); // ->name('admin.products.delete'); // COMMENTÉ - doublon de nom
                Route::post('/upload-video',    [PropertyController::class, 'upload_video']); // ->name('admin.products.upload_video'); // COMMENTÉ - doublon de nom
            });
        });

        // TESTIMONIALS (PROTECTED)
        Route::group(['prefix' => 'testimonials'], function () {
            Route::post('/', [TestimonialController::class, 'save']);
            Route::get('/all', [TestimonialController::class, 'getAll']);
        });

        // USER ROUTES (PROTECTED)
        Route::group(['prefix' => '/user'], function () {
            // USER POSTS
            Route::get('/user-posts', [PropertyController::class, 'getUserPost']);

            // USER PROFILE
            Route::put('update-profile',   [AuthController::class, 'updateUser']); // ->name('user.update-profile'); // COMMENTÉ - doublon de nom
            Route::put('change-password',   [AuthController::class, 'changePassword']); // ->name('user.change-password'); // COMMENTÉ - doublon de nom
            Route::get('list',             [UserController::class, 'listUsers']); // ->name('user.list'); // COMMENTÉ - doublon de nom
            Route::delete('delete',        [UserController::class, 'delete']); // ->name('user.delete'); // COMMENTÉ - doublon de nom

            // USER SCORE (déplacé ici pour éviter le doublon)
            Route::post('update-score', [UserController::class, 'update_score']); // ->name('user.update_score'); // COMMENTÉ - doublon de nom

            // NOTIFICATIONS
            Route::get('notifications',                     [NotificationController::class, 'index']); // ->name('user.notifications'); // COMMENTÉ - doublon de nom
            Route::get('/notifications/unread',             [NotificationController::class, 'unread']);
            Route::post('/notifications/{id}/mark-as-read', [NotificationController::class, 'markAsRead']);
            Route::delete('/notifications/{id}',            [NotificationController::class, 'destroy']);
            Route::post('/notifications/mark-all-as-read',  [NotificationController::class, 'markAllAsRead']);

            // USER REQUEST
            Route::get('user-request', [UserRequestController::class, 'index']);
        });
    });
});
