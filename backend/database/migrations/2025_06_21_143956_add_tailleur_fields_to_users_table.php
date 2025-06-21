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
        Schema::table('users', function (Blueprint $table) {
            $table->string('prenom')->nullable();
            $table->string('telephone')->nullable();
            $table->enum('specialite', ['homme', 'femme', 'enfant', 'tous'])->nullable();
            $table->integer('experience')->nullable();
            $table->text('adresse')->nullable();
            $table->string('nom_atelier')->nullable();
            $table->string('photo')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'prenom',
                'telephone', 
                'specialite',
                'experience',
                'adresse',
                'nom_atelier',
                'photo'
            ]);
        });
    }
};
