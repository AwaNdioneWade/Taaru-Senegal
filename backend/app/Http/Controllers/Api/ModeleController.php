<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Modele;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class ModeleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        $query = Modele::with('user');

        // Filtrage par utilisateur (tailleur)
        if ($user->role === 'tailleur') {
            // Les tailleurs ne voient que leurs propres modèles
            $query->where('user_id', $user->id);
        }

        // Filtrage par type
        if ($request->has('type') && $request->type !== 'all') {
            $query->where('type', $request->type);
        }

        // Filtrage par statut
        if ($request->has('statut') && $request->statut !== 'all') {
            $query->where('statut', $request->statut);
        }

        // Recherche par nom ou description
        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nom', 'LIKE', "%{$search}%")
                  ->orWhere('description', 'LIKE', "%{$search}%")
                  ->orWhere('tags', 'LIKE', "%{$search}%");
            });
        }

        // Tri
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $perPage = $request->get('per_page', 15);
        $modeles = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'message' => 'Modèles récupérés avec succès',
            'data' => $modeles->items(),
            'pagination' => [
                'current_page' => $modeles->currentPage(),
                'last_page' => $modeles->lastPage(),
                'per_page' => $modeles->perPage(),
                'total' => $modeles->total(),
                'from' => $modeles->firstItem(),
                'to' => $modeles->lastItem(),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|in:homme,femme,enfant,mixte',
            'prix' => 'nullable|numeric|min:0',
            'tags' => 'nullable|string', // Sera traité comme une chaîne de caractères séparée par des virgules
            'materiaux' => 'nullable|string', // Sera traité comme une chaîne de caractères séparée par des virgules
            'media.*' => 'required|file|mimes:jpg,jpeg,png,bmp,gif,svg,webp,mp4,mov,avi,wmv|max:20480', // 20MB max par fichier
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = Auth::user();

        // Gestion de l'upload des fichiers
        $photos = [];
        $videos = [];
        
        if ($request->hasFile('media')) {
            foreach ($request->file('media') as $file) {
                // Génère un nom de fichier unique
                $filename = uniqid() . '_' . time() . '.' . $file->getClientOriginalExtension();
                // Stocke le fichier dans public/storage/models/{user_id} en utilisant explicitement le disque public
                $path = $file->storeAs('models/' . $user->id, $filename, 'public');
                // Ajoute le chemin accessible publiquement au tableau approprié
                $publicPath = 'storage/' . $path;
                
                // Détermine si c'est une image ou une vidéo
                $mimeType = $file->getMimeType();
                if (str_starts_with($mimeType, 'image/')) {
                    $photos[] = $publicPath;
                } elseif (str_starts_with($mimeType, 'video/')) {
                    $videos[] = $publicPath;
                }
            }
        }

        // Création du slug
        $slug = Str::slug($request->nom);
        $count = Modele::where('slug', 'LIKE', "{$slug}%")->count();
        if ($count > 0) {
            $slug = "{$slug}-{$count}";
        }

        $modele = Modele::create([
            'user_id' => $user->id,
            'nom' => $request->nom,
            'slug' => $slug,
            'description' => $request->description,
            'type' => $request->type,
            'prix' => $request->prix,
            'tags' => $request->tags ? array_map('trim', explode(',', $request->tags)) : null,
            'materiaux' => $request->materiaux ? array_map('trim', explode(',', $request->materiaux)) : null,
            'photos' => $photos,
            'videos' => $videos,
            'statut' => 'actif', // Statut par défaut
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Modèle créé avec succès',
            'data' => $modele,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = Auth::user();
        $query = Modele::with('user');

        // Filtrage par utilisateur (tailleur)
        if ($user->role === 'tailleur') {
            // Les tailleurs ne peuvent voir que leurs propres modèles
            $query->where('user_id', $user->id);
        }

        $modele = $query->find($id);

        if (!$modele) {
            return response()->json([
                'success' => false,
                'message' => 'Modèle non trouvé',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Modèle récupéré avec succès',
            'data' => $modele,
        ]);
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
