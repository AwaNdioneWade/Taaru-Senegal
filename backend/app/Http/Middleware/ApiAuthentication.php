<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class ApiAuthentication extends Middleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, ...$guards)
    {
        Log::info('ApiAuthentication - Début de la requête', [
            'url' => $request->url(),
            'method' => $request->method(),
            'has_authorization' => $request->hasHeader('Authorization'),
            'authorization_header' => $request->header('Authorization'),
            'authorization_length' => $request->header('Authorization') ? strlen($request->header('Authorization')) : 0,
            'authorization_starts_with_bearer' => $request->header('Authorization') ? str_starts_with($request->header('Authorization'), 'Bearer ') : false,
            'token_part' => $request->header('Authorization') ? substr($request->header('Authorization'), 7, 20) . '...' : 'Aucun token'
        ]);

        try {
            // Utiliser explicitement le guard Sanctum
            $user = auth()->guard('sanctum')->user();
            
            if (!$user) {
                Log::warning('ApiAuthentication - Utilisateur non authentifié avec Sanctum', [
                    'url' => $request->url(),
                    'method' => $request->method(),
                    'has_authorization' => $request->hasHeader('Authorization'),
                    'auth_check_default' => auth()->check(),
                    'auth_check_sanctum' => auth()->guard('sanctum')->check()
                ]);
                
                if ($request->expectsJson() || $request->is('api/*')) {
                    abort(response()->json([
                        'message' => 'Unauthenticated.',
                        'error' => 'Token invalide ou utilisateur non trouvé',
                        'debug' => [
                            'has_authorization' => $request->hasHeader('Authorization'),
                            'authorization_header' => $request->header('Authorization') ? 'Présent' : 'Absent',
                            'authorization_length' => $request->header('Authorization') ? strlen($request->header('Authorization')) : 0,
                            'starts_with_bearer' => $request->header('Authorization') ? str_starts_with($request->header('Authorization'), 'Bearer ') : false,
                            'auth_check_default' => auth()->check(),
                            'auth_check_sanctum' => auth()->guard('sanctum')->check(),
                            'current_user_default' => auth()->user() ? auth()->user()->id : 'null',
                            'current_user_sanctum' => auth()->guard('sanctum')->user() ? auth()->guard('sanctum')->user()->id : 'null'
                        ]
                    ], 401));
                }
            }
            
            Log::info('ApiAuthentication - Utilisateur authentifié avec succès', [
                'user_id' => $user->id,
                'user_email' => $user->email,
                'user_role' => $user->role,
                'guard_used' => 'sanctum'
            ]);
            
            return $next($request);
        } catch (\Exception $e) {
            Log::error('ApiAuthentication - Erreur d\'authentification', [
                'error' => $e->getMessage(),
                'error_class' => get_class($e),
                'url' => $request->url(),
                'method' => $request->method(),
                'has_authorization' => $request->hasHeader('Authorization'),
                'authorization_header' => $request->header('Authorization') ? 'Présent' : 'Absent'
            ]);
            
            if ($request->expectsJson() || $request->is('api/*')) {
                abort(response()->json([
                    'message' => 'Unauthenticated.',
                    'error' => 'Erreur lors de l\'authentification',
                    'debug' => [
                        'has_authorization' => $request->hasHeader('Authorization'),
                        'authorization_header' => $request->header('Authorization') ? 'Présent' : 'Absent',
                        'authorization_length' => $request->header('Authorization') ? strlen($request->header('Authorization')) : 0,
                        'starts_with_bearer' => $request->header('Authorization') ? str_starts_with($request->header('Authorization'), 'Bearer ') : false,
                        'error_message' => $e->getMessage()
                    ]
                ], 401));
            }

            throw $e;
        }
    }

    /**
     * Handle an unauthenticated user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  array  $guards
     * @return void
     *
     * @throws \Illuminate\Auth\AuthenticationException
     */
    protected function unauthenticated($request, array $guards)
    {
        Log::warning('ApiAuthentication - Utilisateur non authentifié', [
            'url' => $request->url(),
            'method' => $request->method(),
            'guards' => $guards,
            'has_authorization' => $request->hasHeader('Authorization')
        ]);

        if ($request->expectsJson() || $request->is('api/*')) {
            abort(response()->json([
                'message' => 'Unauthenticated.',
                'error' => 'Token manquant ou invalide'
            ], 401));
        }

        parent::unauthenticated($request, $guards);
    }

    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo(Request $request): ?string
    {
        if ($request->expectsJson() || $request->is('api/*')) {
            return null;
        }

        return route('login');
    }
} 