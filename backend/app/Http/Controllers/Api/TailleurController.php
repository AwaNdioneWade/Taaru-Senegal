<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class TailleurController extends Controller
{
    /**
     * Afficher la liste des tailleurs
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = User::where('role', 'Tailleur');

            // Recherche par nom, prénom, email ou nom d'atelier
            if ($request->has('search') && $request->search) {
                $search = $request->search;
                $query->where(function($q) use ($search) {
                    $q->where('name', 'LIKE', "%{$search}%")
                      ->orWhere('prenom', 'LIKE', "%{$search}%")
                      ->orWhere('email', 'LIKE', "%{$search}%")
                      ->orWhere('nom_atelier', 'LIKE', "%{$search}%");
                });
            }

            // Filtrage par spécialité
            if ($request->has('specialite') && $request->specialite !== 'all') {
                $query->where('specialite', $request->specialite);
            }

            // Tri
            $sortBy = $request->get('sort_by', 'created_at');
            $sortOrder = $request->get('sort_order', 'desc');
            $query->orderBy($sortBy, $sortOrder);

            // Pagination
            $perPage = $request->get('per_page', 15);
            $tailleurs = $query->paginate($perPage);

            return response()->json([
                'success' => true,
                'message' => 'Liste des tailleurs récupérée avec succès',
                'data' => $tailleurs->items(),
                'pagination' => [
                    'current_page' => $tailleurs->currentPage(),
                    'last_page' => $tailleurs->lastPage(),
                    'per_page' => $tailleurs->perPage(),
                    'total' => $tailleurs->total(),
                    'from' => $tailleurs->firstItem(),
                    'to' => $tailleurs->lastItem(),
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des tailleurs',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Afficher un tailleur spécifique
     */
    public function show(string $id): JsonResponse
    {
        try {
            $tailleur = User::where('role', 'Tailleur')->find($id);

            if (!$tailleur) {
                return response()->json([
                    'success' => false,
                    'message' => 'Tailleur non trouvé'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Tailleur récupéré avec succès',
                'data' => $tailleur
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération du tailleur',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mettre à jour un tailleur
     */
    public function update(Request $request, string $id): JsonResponse
    {
        try {
            $tailleur = User::where('role', 'Tailleur')->find($id);

            if (!$tailleur) {
                return response()->json([
                    'success' => false,
                    'message' => 'Tailleur non trouvé'
                ], 404);
            }

            // Validation des données
            $validatedData = $request->validate([
                'name' => 'sometimes|string|max:100',
                'prenom' => 'sometimes|string|max:100',
                'email' => 'sometimes|email|unique:users,email,' . $id,
                'telephone' => 'sometimes|string|max:20',
                'specialite' => 'sometimes|string|in:homme,femme,enfant,tous',
                'experience' => 'sometimes|integer|min:0',
                'adresse' => 'sometimes|string|max:500',
                'nom_atelier' => 'sometimes|string|max:100',
                'profile_name' => 'sometimes|string|max:100',
                'photo' => 'sometimes|string',
            ]);

            // Mise à jour du slug si le nom de l'atelier change
            if (isset($validatedData['nom_atelier']) && $validatedData['nom_atelier'] !== $tailleur->nom_atelier) {
                $baseSlug = \Illuminate\Support\Str::slug($validatedData['nom_atelier']);
                $slug = $baseSlug;
                $counter = 1;
                
                while (User::where('slug', $slug)->where('id', '!=', $id)->exists()) {
                    $slug = $baseSlug . '-' . $counter;
                    $counter++;
                }
                
                $validatedData['slug'] = $slug;
            }

            $tailleur->update($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Tailleur mis à jour avec succès',
                'data' => $tailleur->fresh()
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Données invalides',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour du tailleur',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Supprimer un tailleur
     */
    public function destroy(string $id): JsonResponse
    {
        try {
            $tailleur = User::where('role', 'Tailleur')->find($id);

            if (!$tailleur) {
                return response()->json([
                    'success' => false,
                    'message' => 'Tailleur non trouvé'
                ], 404);
            }

            $tailleur->delete();

            return response()->json([
                'success' => true,
                'message' => 'Tailleur supprimé avec succès'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression du tailleur',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtenir les statistiques des tailleurs
     */
    public function statistics(): JsonResponse
    {
        try {
            $totalTailleurs = User::where('role', 'Tailleur')->count();
            $specialites = User::where('role', 'Tailleur')
                ->selectRaw('specialite, COUNT(*) as count')
                ->groupBy('specialite')
                ->get();

            $moyenneExperience = User::where('role', 'Tailleur')
                ->whereNotNull('experience')
                ->avg('experience');

            return response()->json([
                'success' => true,
                'message' => 'Statistiques récupérées avec succès',
                'data' => [
                    'total_tailleurs' => $totalTailleurs,
                    'specialites' => $specialites,
                    'moyenne_experience' => round($moyenneExperience, 1),
                    'repartition_experience' => [
                        'debutant' => User::where('role', 'Tailleur')->where('experience', '<=', 2)->count(),
                        'intermediaire' => User::where('role', 'Tailleur')->whereBetween('experience', [3, 7])->count(),
                        'expert' => User::where('role', 'Tailleur')->where('experience', '>=', 8)->count(),
                    ]
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des statistiques',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
