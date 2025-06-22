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
        // Vérifier si la colonne materiaux_utilises existe déjà
        if (!Schema::hasColumn('modeles', 'materiaux_utilises')) {
            Schema::table('modeles', function (Blueprint $table) {
                $table->text('materiaux_utilises')->nullable();
            });
        }
        
        // Vérifier si la colonne statut existe déjà
        if (!Schema::hasColumn('modeles', 'statut')) {
            Schema::table('modeles', function (Blueprint $table) {
                $table->enum('statut', ['en_attente', 'approuve', 'rejete', 'actif'])->default('en_attente');
            });
        }
        
        // Vérifier si la colonne photos existe déjà
        if (!Schema::hasColumn('modeles', 'photos')) {
            Schema::table('modeles', function (Blueprint $table) {
                $table->json('photos')->nullable();
            });
        }
        
        // Vérifier si la colonne videos existe déjà
        if (!Schema::hasColumn('modeles', 'videos')) {
            Schema::table('modeles', function (Blueprint $table) {
                $table->json('videos')->nullable();
            });
        }
        
        // Supprimer l'ancienne colonne media si elle existe
        if (Schema::hasColumn('modeles', 'media')) {
            Schema::table('modeles', function (Blueprint $table) {
                $table->dropColumn('media');
            });
        }
        
        // Supprimer l'ancienne colonne materiaux si elle existe
        if (Schema::hasColumn('modeles', 'materiaux')) {
            Schema::table('modeles', function (Blueprint $table) {
                $table->dropColumn('materiaux');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('modeles', function (Blueprint $table) {
            // Restaurer les colonnes originales
            if (Schema::hasColumn('modeles', 'materiaux_utilises')) {
                $table->dropColumn('materiaux_utilises');
            }
            
            if (Schema::hasColumn('modeles', 'statut')) {
                $table->dropColumn('statut');
            }
            
            if (Schema::hasColumn('modeles', 'photos')) {
                $table->dropColumn('photos');
            }
            
            if (Schema::hasColumn('modeles', 'videos')) {
                $table->dropColumn('videos');
            }
            
            // Restaurer les anciennes colonnes
            $table->json('materiaux')->nullable();
            $table->json('media')->nullable();
        });
    }
}; 