<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Laravel\Sanctum\PersonalAccessToken;
use App\Models\User;

class CheckToken extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'token:check {token?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Vérifier un token Sanctum';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $tokenValue = $this->argument('token');
        
        if (!$tokenValue) {
            $this->error('Veuillez fournir un token à vérifier');
            return 1;
        }
        
        // Supprimer le préfixe "Bearer " si présent
        $tokenValue = str_replace('Bearer ', '', $tokenValue);
        
        $this->info("Vérification du token: {$tokenValue}");
        
        // Chercher le token dans la base de données
        $token = PersonalAccessToken::findToken($tokenValue);
        
        if (!$token) {
            $this->error('Token non trouvé dans la base de données');
            return 1;
        }
        
        $this->info('✅ Token trouvé dans la base de données');
        $this->info("ID du token: {$token->id}");
        $this->info("Nom du token: {$token->name}");
        $this->info("Créé le: {$token->created_at}");
        $this->info("Expire le: " . ($token->expires_at ? $token->expires_at : 'Jamais'));
        
        // Vérifier l'utilisateur associé
        $user = $token->tokenable;
        if ($user) {
            $this->info('✅ Utilisateur associé trouvé');
            $this->info("ID utilisateur: {$user->id}");
            $this->info("Email: {$user->email}");
            $this->info("Nom: {$user->name}");
            $this->info("Rôle: {$user->role}");
        } else {
            $this->error('❌ Aucun utilisateur associé à ce token');
        }
        
        // Vérifier si le token est valide
        if ($token->expires_at && $token->expires_at->isPast()) {
            $this->error('❌ Token expiré');
        } else {
            $this->info('✅ Token valide');
        }
        
        return 0;
    }
} 