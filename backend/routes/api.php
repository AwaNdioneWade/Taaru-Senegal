<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TailleurController;
use App\Http\Controllers\Api\ModeleController;
use App\Http\Controllers\Api\Admin\UserController as AdminUserController;


Route::prefix('auth')->group(function () {
    Route::post('/register',        [AuthController::class, 'register']);
    Route::post('/login',           [AuthController::class, 'login']);
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::middleware('api.auth')->get('/me',     [AuthController::class, 'me']);
    Route::middleware('api.auth')->post('/logout',[AuthController::class, 'logout']);
    Route::middleware('api.auth')->get('/test',   [AuthController::class, 'testAuth']);
});

// Routes pour les tailleurs
Route::prefix('tailleurs')->group(function () {
    Route::get('/', [TailleurController::class, 'index']);
    Route::get('/statistics', [TailleurController::class, 'statistics']);
    Route::get('/{id}', [TailleurController::class, 'show']);
    Route::put('/{id}', [TailleurController::class, 'update']);
    Route::delete('/{id}', [TailleurController::class, 'destroy']);
});

// Routes pour les modèles
Route::prefix('modeles')->group(function () {
    // Routes publiques (accessibles sans authentification)
    Route::get('/', [ModeleController::class, 'index']);
    Route::get('/{id}', [ModeleController::class, 'show']);
    
    // Routes protégées (nécessitent une authentification)
    Route::middleware('api.auth')->group(function () {
        Route::post('/', [ModeleController::class, 'store']);
        Route::put('/{id}', [ModeleController::class, 'update']);
        Route::delete('/{id}', [ModeleController::class, 'destroy']);
    });
});

// Routes pour l'administration
Route::middleware(['api.auth', 'role:admin'])->prefix('admin')->group(function () {
    Route::post('/users', [AdminUserController::class, 'store']);
    // Ajoutez ici d'autres routes d'administration
});

// Routes de test et diagnostic
Route::get('/test-cors', function () {
    return response()->json([
        'success' => true,
        'message' => 'Test CORS réussi',
        'timestamp' => now()
    ]);
});

Route::options('/test-cors', function () {
    return response()->json(['message' => 'OPTIONS request handled'], 200);
});

