<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Modele extends Model
{
    protected $fillable = [
        'user_id',
        'nom',
        'type',
        'prix',
        'description',
        'tags',
        'materiaux_utilises',
        'slug',
        'statut',
        'photos',
        'videos'
    ];

    protected $casts = [
        'tags' => 'array',
        'materiaux_utilises' => 'string',
        'photos' => 'array',
        'videos' => 'array',
        'prix' => 'decimal:2',
    ];

    /**
     * Relation avec l'utilisateur (tailleur) qui a créé le modèle
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Générer un slug unique pour le modèle
     */
    public static function generateSlug($nom)
    {
        $slug = \Str::slug($nom);
        $originalSlug = $slug;
        $count = 1;

        while (static::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $count;
            $count++;
        }

        return $slug;
    }

    /**
     * Scope pour les modèles actifs
     */
    public function scopeActive($query)
    {
        return $query->where('statut', 'actif');
    }

    /**
     * Scope pour filtrer par type
     */
    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }
}
