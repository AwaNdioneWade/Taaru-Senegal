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
        Schema::create('modeles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Lié au tailleur
            $table->string('nom');
            $table->string('slug')->unique();
            $table->text('description');
            $table->enum('type', ['homme', 'femme', 'enfant', 'mixte']);
            $table->decimal('prix', 10, 2)->nullable();
            $table->json('tags')->nullable();
            $table->json('materiaux')->nullable();
            $table->json('media')->nullable(); // Pour stocker les chemins des images/vidéos
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('modeles');
    }
};
