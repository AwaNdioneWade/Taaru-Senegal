<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Étape 1: Étendre temporairement l'enum pour accepter toutes les valeurs
        DB::statement("ALTER TABLE modeles MODIFY COLUMN statut ENUM('actif', 'inactif', 'en_revision', 'en_attente', 'approuve', 'rejete') DEFAULT 'actif'");
        
        // Étape 2: Mettre à jour les valeurs existantes
        DB::statement("UPDATE modeles SET statut = 'en_attente' WHERE statut = 'en_revision'");
        DB::statement("UPDATE modeles SET statut = 'rejete' WHERE statut = 'inactif'");
        // 'actif' reste 'actif'
        
        // Étape 3: Finaliser l'enum avec les nouvelles valeurs uniquement
        DB::statement("ALTER TABLE modeles MODIFY COLUMN statut ENUM('en_attente', 'approuve', 'rejete', 'actif') DEFAULT 'en_attente'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Étape 1: Étendre temporairement l'enum pour accepter toutes les valeurs
        DB::statement("ALTER TABLE modeles MODIFY COLUMN statut ENUM('en_attente', 'approuve', 'rejete', 'actif', 'inactif', 'en_revision') DEFAULT 'en_attente'");
        
        // Étape 2: Mettre à jour les valeurs pour l'ancien enum
        DB::statement("UPDATE modeles SET statut = 'en_revision' WHERE statut = 'en_attente'");
        DB::statement("UPDATE modeles SET statut = 'inactif' WHERE statut = 'rejete'");
        // 'actif' reste 'actif'
        
        // Étape 3: Restaurer l'ancien enum
        DB::statement("ALTER TABLE modeles MODIFY COLUMN statut ENUM('actif', 'inactif', 'en_revision') DEFAULT 'actif'");
    }
};
