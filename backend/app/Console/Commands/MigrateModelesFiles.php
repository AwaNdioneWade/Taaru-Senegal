<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use App\Models\Modele;
use Illuminate\Support\Facades\File;

class MigrateModelesFiles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'modeles:migrate-files';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Migrate model files from private storage to public storage';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Début de la migration des fichiers de modèles...');

        $modeles = Modele::all();
        $migratedCount = 0;
        $errorCount = 0;

        foreach ($modeles as $modele) {
            $this->info("Traitement du modèle: {$modele->nom} (ID: {$modele->id})");

            // Migrer les photos
            if ($modele->photos && is_array($modele->photos)) {
                $newPhotos = [];
                foreach ($modele->photos as $photoPath) {
                    $newPath = $this->migrateFile($photoPath, $modele->user_id);
                    if ($newPath) {
                        $newPhotos[] = $newPath;
                        $migratedCount++;
                    } else {
                        $errorCount++;
                    }
                }
                $modele->photos = $newPhotos;
            }

            // Migrer les vidéos
            if ($modele->videos && is_array($modele->videos)) {
                $newVideos = [];
                foreach ($modele->videos as $videoPath) {
                    $newPath = $this->migrateFile($videoPath, $modele->user_id);
                    if ($newPath) {
                        $newVideos[] = $newPath;
                        $migratedCount++;
                    } else {
                        $errorCount++;
                    }
                }
                $modele->videos = $newVideos;
            }

            $modele->save();
        }

        $this->info("Migration terminée !");
        $this->info("Fichiers migrés avec succès: {$migratedCount}");
        if ($errorCount > 0) {
            $this->warn("Erreurs rencontrées: {$errorCount}");
        }
    }

    private function migrateFile($oldPath, $userId)
    {
        // Extraire le nom du fichier du chemin
        $filename = basename($oldPath);
        
        // Chemin source dans le stockage privé
        $sourcePath = "public/models/{$userId}/{$filename}";
        
        // Chemin de destination dans le stockage public
        $destinationPath = "models/{$userId}/{$filename}";
        
        // Vérifier si le fichier source existe
        if (!Storage::disk('local')->exists($sourcePath)) {
            $this->error("Fichier source introuvable: {$sourcePath}");
            return null;
        }

        try {
            // Créer le dossier de destination s'il n'existe pas
            Storage::disk('public')->makeDirectory("models/{$userId}");
            
            // Copier le fichier
            $fileContent = Storage::disk('local')->get($sourcePath);
            Storage::disk('public')->put($destinationPath, $fileContent);
            
            // Retourner le nouveau chemin public
            return "storage/{$destinationPath}";
            
        } catch (\Exception $e) {
            $this->error("Erreur lors de la migration du fichier {$filename}: " . $e->getMessage());
            return null;
        }
    }
} 