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
    Route::middleware('auth:sanctum')->get('/me',     [AuthController::class, 'me']);
    Route::middleware('auth:sanctum')->post('/logout',[AuthController::class, 'logout']);
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
Route::middleware('auth:sanctum')->prefix('modeles')->group(function () {
    Route::get('/', [ModeleController::class, 'index']);
    Route::post('/', [ModeleController::class, 'store']);
    Route::get('/{id}', [ModeleController::class, 'show']);
    Route::put('/{id}', [ModeleController::class, 'update']);
    Route::delete('/{id}', [ModeleController::class, 'destroy']);
});

// Routes pour l'administration
Route::middleware(['auth:sanctum', 'role:admin'])->prefix('admin')->group(function () {
    Route::post('/users', [AdminUserController::class, 'store']);
    // Ajoutez ici d'autres routes d'administration
});

