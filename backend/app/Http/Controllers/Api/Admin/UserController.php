<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Logique pour lister les utilisateurs (pour plus tard)
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'role' => 'required|in:Client,Tailleur,Admin',
            'prenom' => 'required_if:role,Tailleur|string|max:255',
            'telephone' => 'required_if:role,Tailleur|string|max:20',
            'specialite' => 'required_if:role,Tailleur|in:homme,femme,enfant,tous',
            'experience' => 'required_if:role,Tailleur|integer|min:0',
            'adresse' => 'required_if:role,Tailleur|string|max:255',
            'nom_atelier' => 'required_if:role,Tailleur|string|max:255',
            'photo' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $temporaryPassword = Str::password(10, true, true, true, false);

        $slug = Str::slug($request->nom_atelier);
        $count = User::where('slug', 'LIKE', "{$slug}%")->count();
        if ($count > 0) {
            $slug = "{$slug}-{$count}";
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($temporaryPassword),
            'role' => $request->role,
            'prenom' => $request->prenom,
            'telephone' => $request->telephone,
            'specialite' => $request->specialite,
            'experience' => $request->experience,
            'adresse' => $request->adresse,
            'nom_atelier' => $request->nom_atelier,
            'profile_name' => $request->nom_atelier,
            'slug' => $slug,
        ]);
        
        try {
            $token = Password::broker()->createToken($user);
            $user->sendPasswordResetNotification($token);
            $emailStatus = 'Email de réinitialisation envoyé avec succès.';
        } catch (\Exception $e) {
            report($e);
            $emailStatus = 'Impossible d\'envoyer l\'email de réinitialisation.';
        }

        return response()->json([
            'success' => true,
            'message' => 'Utilisateur créé avec succès. ' . $emailStatus,
            'user' => $user,
            'temporary_password' => $temporaryPassword,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
