<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
   

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|confirmed|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'Client', // Inscription par défaut pour un client
        ]);

        // Optionnel : connecter l'utilisateur directement après l'inscription
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Compte client créé avec succès.',
            'user' => $user,
            'access_token' => $token,
        ], 201);
    }


    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $fields['email'])->first();

        if (!$user || !Hash::check($fields['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Les identifiants sont incorrects.'],
            ]);
        }

        $token = $user->createToken('taaru_token')->plainTextToken;

        return response()->json(['user' => $user, 'token' => $token], 200);
    }

    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        // Envoie du lien de reset
        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status === Password::RESET_LINK_SENT) {
            return response()->json(['message' => 'Lien de réinitialisation envoyé.'], 200);
        }

        return response()->json(['message' => 'Impossible d\'envoyer le lien.'], 500);
    }

    public function me(Request $request)
    {
        return response()->json($request->user());
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Deconnecte avec succes.']);
    }

    public function testAuth(Request $request)
    {
        $user = $request->user();
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Non authentifié',
                'debug' => [
                    'has_user' => false,
                    'headers' => $request->headers->all(),
                    'authorization' => $request->header('Authorization')
                ]
            ], 401);
        }
        
        return response()->json([
            'success' => true,
            'message' => 'Authentifié avec succès',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role
            ],
            'debug' => [
                'has_user' => true,
                'guard' => auth()->getDefaultDriver(),
                'current_guard' => auth()->guard()->getName()
            ]
        ]);
    }
}
