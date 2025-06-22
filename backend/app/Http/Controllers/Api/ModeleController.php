<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Modele;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ModeleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            Log::info('Début de la méthode index - Filtres:', $request->all());
            
            $user = Auth::user();
            $query = Modele::with('user');

            // Filtrage par utilisateur (tailleur) - seulement si l'utilisateur est authentifié
            if ($user && $user->role === 'tailleur') {
                // Les tailleurs ne voient que leurs propres modèles
                $query->where('user_id', $user->id);
            } else {
                // Pour les utilisateurs non authentifiés ou non-tailleurs, afficher seulement les modèles actifs
                $query->where('statut', 'actif');
            }

            // Filtrage par type
            if ($request->has('type') && $request->type !== 'all') {
                $query->where('type', $request->type);
            }

            // Filtrage par statut (seulement pour les utilisateurs authentifiés)
            if ($user && $request->has('statut') && $request->statut !== 'all') {
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
            
            Log::info('Modèles récupérés avec succès', [
                'count' => $modeles->count(),
                'user_authenticated' => $user ? 'yes' : 'no',
                'user_role' => $user ? $user->role : 'none'
            ]);
            
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
            
        } catch (\Exception $e) {
            Log::error('Erreur lors de la récupération des modèles', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des modèles',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Utiliser explicitement le guard Sanctum
            $user = auth()->guard('sanctum')->user();
            
            Log::info('Début de la création d\'un modèle', [
                'user_id' => $user ? $user->id : 'null',
                'user_email' => $user ? $user->email : 'null',
                'user_role' => $user ? $user->role : 'null',
                'auth_check_default' => auth()->check(),
                'auth_check_sanctum' => auth()->guard('sanctum')->check(),
                'request_data' => $request->except(['photos', 'videos'])
            ]);
            
            if (!$user) {
                Log::error('Utilisateur non authentifié dans le contrôleur', [
                    'auth_check_default' => auth()->check(),
                    'auth_check_sanctum' => auth()->guard('sanctum')->check(),
                    'request_user' => $request->user() ? $request->user()->id : 'null'
                ]);
                
                return response()->json([
                    'success' => false,
                    'message' => 'Utilisateur non authentifié',
                    'error' => 'Token valide mais utilisateur non trouvé'
                ], 401);
            }
            
            // Validation
            $validator = Validator::make($request->all(), [
                'nom' => 'required|string|max:255',
                'description' => 'required|string',
                'type' => 'required|string|in:homme,femme,enfant,mixte',
                'prix' => 'required|numeric|min:0',
                'materiaux' => 'required|string',
                'tags' => 'nullable|string',
                'photos.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240', // 10MB max
                'videos.*' => 'nullable|mimes:mp4,avi,mov,wmv,flv,webm,mkv|max:51200', // 50MB max
            ], [
                'photos.*.image' => 'Le fichier doit être une image.',
                'photos.*.mimes' => 'Le format d\'image doit être : jpeg, png, jpg, gif, webp.',
                'photos.*.max' => 'La taille de l\'image ne doit pas dépasser 10MB.',
                'videos.*.mimes' => 'Le format vidéo doit être : mp4, avi, mov, wmv, flv, webm, mkv.',
                'videos.*.max' => 'La taille de la vidéo ne doit pas dépasser 50MB.',
            ]);

            if ($validator->fails()) {
                Log::warning('Validation échouée', ['errors' => $validator->errors()]);
                return response()->json([
                    'success' => false,
                    'message' => 'Données invalides',
                    'errors' => $validator->errors()
                ], 422);
            }

            Log::info('Validation réussie, début du traitement des fichiers');
            
            // Traitement des photos
            $photos = [];
            if ($request->hasFile('photos')) {
                Log::info('Traitement des photos', ['count' => count($request->file('photos'))]);
                
                foreach ($request->file('photos') as $photo) {
                    try {
                        Log::info('Traitement de la photo', [
                            'original_name' => $photo->getClientOriginalName(),
                            'size' => $photo->getSize(),
                            'mime_type' => $photo->getMimeType()
                        ]);
                        
                        $filename = time() . '_' . uniqid() . '.' . $photo->getClientOriginalExtension();
                        $path = $photo->storeAs('public/modeles/photos', $filename);
                        
                        if ($path) {
                            $photos[] = $path;
                            Log::info('Photo sauvegardée avec succès', ['path' => $path]);
                        } else {
                            Log::error('Échec de la sauvegarde de la photo', ['filename' => $filename]);
                        }
                    } catch (\Exception $e) {
                        Log::error('Erreur lors du traitement de la photo', [
                            'error' => $e->getMessage(),
                            'filename' => $photo->getClientOriginalName()
                        ]);
                    }
                }
            }

            // Traitement des vidéos
            $videos = [];
            if ($request->hasFile('videos')) {
                Log::info('Traitement des vidéos', ['count' => count($request->file('videos'))]);
                
                foreach ($request->file('videos') as $video) {
                    try {
                        Log::info('Traitement de la vidéo', [
                            'original_name' => $video->getClientOriginalName(),
                            'size' => $video->getSize(),
                            'mime_type' => $video->getMimeType()
                        ]);
                        
                        $filename = time() . '_' . uniqid() . '.' . $video->getClientOriginalExtension();
                        $path = $video->storeAs('public/modeles/videos', $filename);
                        
                        if ($path) {
                            $videos[] = $path;
                            Log::info('Vidéo sauvegardée avec succès', ['path' => $path]);
                        } else {
                            Log::error('Échec de la sauvegarde de la vidéo', ['filename' => $filename]);
                        }
                    } catch (\Exception $e) {
                        Log::error('Erreur lors du traitement de la vidéo', [
                            'error' => $e->getMessage(),
                            'filename' => $video->getClientOriginalName()
                        ]);
                    }
                }
            }

            Log::info('Création du modèle en base de données', [
                'photos_count' => count($photos),
                'videos_count' => count($videos)
            ]);

            // Création du slug
            $slug = Str::slug($request->nom);
            $count = Modele::where('slug', 'LIKE', "{$slug}%")->count();
            if ($count > 0) {
                $slug = "{$slug}-{$count}";
            }

            // Création du modèle
            $modele = Modele::create([
                'user_id' => $user->id,
                'nom' => $request->nom,
                'slug' => $slug,
                'description' => $request->description,
                'type' => $request->type,
                'prix' => $request->prix,
                'materiaux' => json_encode([$request->materiaux]),
                'tags' => json_encode([$request->tags]),
                'photos' => json_encode($photos),
                'videos' => json_encode($videos),
                'statut' => 'en_revision'
            ]);

            Log::info('Modèle créé avec succès', [
                'modele_id' => $modele->id,
                'nom' => $modele->nom
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Modèle créé avec succès',
                'data' => $modele->load('user')
            ], 201);

        } catch (\Exception $e) {
            Log::error('Erreur lors de la création du modèle', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'user_id' => $user ? $user->id : 'non authentifié'
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création du modèle',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $user = Auth::user();
            $query = Modele::with('user');

            // Filtrage par utilisateur (tailleur) - seulement si l'utilisateur est authentifié
            if ($user && $user->role === 'tailleur') {
                // Les tailleurs ne peuvent voir que leurs propres modèles
                $query->where('user_id', $user->id);
            } else {
                // Pour les utilisateurs non authentifiés, afficher seulement les modèles actifs
                $query->where('statut', 'actif');
            }

            $modele = $query->find($id);

            if (!$modele) {
                return response()->json([
                    'success' => false,
                    'message' => 'Modèle non trouvé',
                ], 404);
            }

            Log::info('Modèle récupéré avec succès', [
                'modele_id' => $modele->id,
                'user_authenticated' => $user ? 'yes' : 'no',
                'user_role' => $user ? $user->role : 'none'
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Modèle récupéré avec succès',
                'data' => $modele,
            ]);
            
        } catch (\Exception $e) {
            Log::error('Erreur lors de la récupération du modèle', [
                'error' => $e->getMessage(),
                'modele_id' => $id
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Modèle non trouvé'
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $user = auth()->guard('sanctum')->user();
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Utilisateur non authentifié'
                ], 401);
            }
            
            $modele = Modele::findOrFail($id);
            
            // Vérifier que l'utilisateur est propriétaire du modèle
            if ($modele->user_id !== $user->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Non autorisé'
                ], 403);
            }
            
            $modele->update($request->only([
                'nom', 'description', 'type', 'prix', 
                'materiaux', 'tags', 'statut'
            ]));
            
            return response()->json([
                'success' => true,
                'message' => 'Modèle mis à jour avec succès',
                'data' => $modele
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour'
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        try {
            $user = auth()->guard('sanctum')->user();
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Utilisateur non authentifié'
                ], 401);
            }
            
            $modele = Modele::findOrFail($id);
            
            // Vérifier que l'utilisateur est propriétaire du modèle
            if ($modele->user_id !== $user->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Non autorisé'
                ], 403);
            }
            
            $modele->delete();
            
            return response()->json([
                'success' => true,
                'message' => 'Modèle supprimé avec succès'
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression'
            ], 500);
        }
    }
}
