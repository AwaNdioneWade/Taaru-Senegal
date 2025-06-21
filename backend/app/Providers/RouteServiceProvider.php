<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * Boot the route services for the application.
     */
    public function boot(): void
    {
        $this->routes(function () {
            // Charge routes/api.php sous le préfixe /api
            Route::prefix('api')
                 ->middleware('api')
                 ->group(base_path('routes/api.php'));

            // Charge routes/web.php
            Route::middleware('web')
                 ->group(base_path('routes/web.php'));
        });
    }
}
