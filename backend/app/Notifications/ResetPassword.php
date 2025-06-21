<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Lang;

class ResetPassword extends Notification
{
    public $token;

    public function __construct($token)
    {
        $this->token = $token;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        // URL vers ton front (Vite) ou vers une view Laravel
        $resetUrl = config('app.url')
            . '/password/reset/' . $this->token
            . '?email=' . urlencode($notifiable->email);

        return (new MailMessage)
            ->subject(Lang::get('Réinitialisation de votre mot de passe'))
            ->greeting("Bonjour {$notifiable->name},")
            ->line("Vous avez demandé la réinitialisation de votre mot de passe.")
            ->action('Réinitialiser mon mot de passe', $resetUrl)
            ->line("Ce lien expirera dans ".config('auth.passwords.users.expire')." minutes.")
            ->line("Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.")
            ->salutation("Cordialement,\nL’équipe Taaru Sénégal");
    }
}
