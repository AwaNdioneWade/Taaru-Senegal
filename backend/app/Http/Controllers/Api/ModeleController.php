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
                
                $response = response()->json([
                    'success' => false,
                    'message' => 'Utilisateur non authentifié',
                    'error' => 'Token valide mais utilisateur non trouvé'
                ], 401);
                
                // Ajouter les en-têtes CORS manuellement
                $response->headers->set('Access-Control-Allow-Origin', 'http://localhost:5173');
                $response->headers->set('Access-Control-Allow-Credentials', 'true');
                
                return $response;
            }
            
            // Validation
            $validator = Validator::make($request->all(), [
                'nom' => 'required|string|max:255',
                'description' => 'required|string',
                'type' => 'required|string|in:homme,femme,enfant,mixte',
                'prix' => 'nullable|numeric|min:0',
                'materiaux' => 'nullable|string',
                'tags' => 'nullable|string',
                'statut' => 'nullable|string|in:en_attente,approuve,rejete,actif',
                'photos.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240', // 10MB max
                'videos.*' => 'nullable|file|mimes:mp4,avi,mov,wmv,flv,webm,mkv,3gp,m4v|max:51200', // 50MB max
            ], [
                'photos.*.image' => 'Le fichier doit être une image.',
                'photos.*.mimes' => 'Le format d\'image doit être : jpeg, png, jpg, gif, webp.',
                'photos.*.max' => 'La taille de l\'image ne doit pas dépasser 10MB.',
                'videos.*.file' => 'Le fichier doit être un fichier valide.',
                'videos.*.mimes' => 'Le format vidéo doit être : mp4, avi, mov, wmv, flv, webm, mkv, 3gp, m4v.',
                'videos.*.max' => 'La taille de la vidéo ne doit pas dépasser 50MB.',
            ]);

            if ($validator->fails()) {
                Log::warning('Validation échouée', [
                    'errors' => $validator->errors(),
                    'request_data' => $request->except(['photos', 'videos']),
                    'files_count' => count($request->allFiles())
                ]);
                return response()->json([
                    'success' => false,
                    'message' => 'Données invalides',
                    'errors' => $validator->errors()
                ], 422);
            }

            Log::info('Validation réussie, début du traitement des fichiers', [
                'files_count' => count($request->allFiles()),
                'all_files' => array_keys($request->allFiles())
            ]);
            
            // Traitement des photos - récupérer tous les fichiers photos
            $photos = [];
            $photoFiles = [];
            
            // Collecter tous les fichiers photos depuis la requête
            foreach ($request->allFiles() as $key => $file) {
                if (str_starts_with($key, 'photos[') && str_ends_with($key, ']')) {
                    $photoFiles[] = $file;
                }
            }
            
            if (!empty($photoFiles)) {
                Log::info('Traitement des photos', ['count' => count($photoFiles)]);
                
                foreach ($photoFiles as $photo) {
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

            // Traitement des vidéos - récupérer tous les fichiers vidéos
            $videos = [];
            $videoFiles = [];
            
            // Collecter tous les fichiers vidéos depuis la requête
            foreach ($request->allFiles() as $key => $file) {
                if (str_starts_with($key, 'videos[') && str_ends_with($key, ']')) {
                    $videoFiles[] = $file;
                }
            }
            
            if (!empty($videoFiles)) {
                Log::info('Traitement des vidéos', ['count' => count($videoFiles)]);
                
                foreach ($videoFiles as $index => $video) {
                    try {
                        Log::info('Traitement de la vidéo', [
                            'index' => $index,
                            'original_name' => $video->getClientOriginalName(),
                            'size' => $video->getSize(),
                            'mime_type' => $video->getMimeType(),
                            'extension' => $video->getClientOriginalExtension(),
                            'error' => $video->getError(),
                            'is_valid' => $video->isValid()
                        ]);
                        
                        // Vérifier si le fichier est valide
                        if (!$video->isValid()) {
                            Log::error('Fichier vidéo invalide', [
                                'index' => $index,
                                'error' => $video->getError(),
                                'error_message' => $this->getUploadErrorMessage($video->getError())
                            ]);
                            throw new \Exception('Fichier vidéo invalide: ' . $this->getUploadErrorMessage($video->getError()));
                        }
                        
                        // Vérifier la taille du fichier
                        if ($video->getSize() > 50 * 1024 * 1024) { // 50MB
                            Log::error('Fichier vidéo trop volumineux', [
                                'index' => $index,
                                'size' => $video->getSize(),
                                'max_size' => 50 * 1024 * 1024
                            ]);
                            throw new \Exception('Fichier vidéo trop volumineux. Taille maximale: 50MB');
                        }
                        
                        $filename = time() . '_' . uniqid() . '.' . $video->getClientOriginalExtension();
                        $path = $video->storeAs('public/modeles/videos', $filename);
                        
                        if ($path) {
                            $videos[] = $path;
                            Log::info('Vidéo sauvegardée avec succès', ['path' => $path]);
                        } else {
                            Log::error('Échec de la sauvegarde de la vidéo', ['filename' => $filename]);
                            throw new \Exception('Échec de la sauvegarde de la vidéo');
                        }
                    } catch (\Exception $e) {
                        Log::error('Erreur lors du traitement de la vidéo', [
                            'index' => $index,
                            'error' => $e->getMessage(),
                            'filename' => $video->getClientOriginalName()
                        ]);
                        throw $e;
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
                'prix' => $request->prix ?? 0,
                'materiaux' => $request->materiaux ? json_encode([$request->materiaux]) : null,
                'tags' => $request->tags ? json_encode([$request->tags]) : null,
                'photos' => json_encode($photos),
                'videos' => json_encode($videos),
                'statut' => $request->statut ?? 'en_attente'
            ]);

            Log::info('Modèle créé avec succès', [
                'modele_id' => $modele->id,
                'nom' => $modele->nom
            ]);

            $response = response()->json([
                'success' => true,
                'message' => 'Modèle créé avec succès',
                'data' => $modele->load('user')
            ], 201);

            // Ajouter les en-têtes CORS manuellement
            $response->headers->set('Access-Control-Allow-Origin', 'http://localhost:5173');
            $response->headers->set('Access-Control-Allow-Credentials', 'true');

            return $response;

        } catch (\Exception $e) {
            Log::error('Erreur lors de la création du modèle', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'user_id' => $user ? $user->id : 'non authentifié'
            ]);
            
            $response = response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création du modèle',
                'error' => $e->getMessage()
            ], 500);

            // Ajouter les en-têtes CORS manuellement
            $response->headers->set('Access-Control-Allow-Origin', 'http://localhost:5173');
            $response->headers->set('Access-Control-Allow-Credentials', 'true');

            return $response;
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $modele = Modele::with('user')->findOrFail($id);
            
            return response()->json([
                'success' => true,
                'message' => 'Modèle récupéré avec succès',
                'data' => $modele
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Modèle non trouvé',
                'error' => $e->getMessage()
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

    /**
     * Traduit les codes d'erreur d'upload PHP en messages lisibles
     */
    private function getUploadErrorMessage($errorCode)
    {
        switch ($errorCode) {
            case UPLOAD_ERR_OK:
                return 'Aucune erreur';
            case UPLOAD_ERR_INI_SIZE:
                return 'Le fichier dépasse la taille maximale autorisée par PHP (upload_max_filesize)';
            case UPLOAD_ERR_FORM_SIZE:
                return 'Le fichier dépasse la taille maximale autorisée par le formulaire (MAX_FILE_SIZE)';
            case UPLOAD_ERR_PARTIAL:
                return 'Le fichier n\'a été que partiellement téléversé';
            case UPLOAD_ERR_NO_FILE:
                return 'Aucun fichier n\'a été téléversé';
            case UPLOAD_ERR_NO_TMP_DIR:
                return 'Dossier temporaire manquant';
            case UPLOAD_ERR_CANT_WRITE:
                return 'Échec de l\'écriture du fichier sur le disque';
            case UPLOAD_ERR_EXTENSION:
                return 'Une extension PHP a arrêté le téléversement du fichier';
            default:
                return 'Erreur inconnue';
        }
    }
}
