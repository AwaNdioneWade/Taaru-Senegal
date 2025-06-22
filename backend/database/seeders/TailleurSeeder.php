<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class TailleurSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Tailleur Test',
            'email' => 'tailleur@test.com',
            'password' => Hash::make('password'),
            'role' => 'tailleur',
            'profile_name' => 'Tailleur Test',
            'prenom' => 'Test',
            'telephone' => '777777777',
            'specialite' => 'tous',
            'experience' => 5,
            'adresse' => 'Dakar, Sénégal',
            'nom_atelier' => 'Atelier Test',
        ]);

        $this->command->info('Compte tailleur de test créé :');
        $this->command->info('Email: tailleur@test.com');
        $this->command->info('Mot de passe: password');
    }
} 