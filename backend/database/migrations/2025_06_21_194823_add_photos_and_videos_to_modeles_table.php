<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('modeles', function (Blueprint $table) {
            $table->json('photos')->nullable()->after('materiaux');
            $table->json('videos')->nullable()->after('photos');
            $table->enum('statut', ['actif', 'inactif', 'en_revision'])->default('actif')->after('videos');
            // Supprimer l'ancienne colonne media si elle existe
            $table->dropColumn('media');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('modeles', function (Blueprint $table) {
            $table->json('media')->nullable();
            $table->dropColumn(['photos', 'videos', 'statut']);
        });
    }
};
