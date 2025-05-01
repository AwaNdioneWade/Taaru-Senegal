import React, { useState } from 'react'
import Button from '../components/forms/Button';
import InputField from '../components/forms/InputField';
import Select from '../components/forms/Select';

const roles = ['Client', 'Tailleur', 'Vendeur de Tissu', 'Vendeur d’Accessoires'];

function Inscription () {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState(roles[0]);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Vérification simple (à améliorer avec useForm plus tard)
      if (password !== confirmPassword) {
        alert('Les mots de passe ne correspondent pas.');
        return;
      }
  
      // Appel API d’inscription à venir ici
      const userData = {
        fullName,
        email,
        role,
        password,
      };
      console.log(userData);
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-semibold text-center mb-6">Créer un compte</h2>
  
          <InputField
            label="Nom complet"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            placeholder="Ex : Fatou Ndiaye"
            required
          />
  
          <InputField
            label="Adresse Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Ex : fatou@mail.com"
            required
          />
  
          <Select
            label="Type de compte"
            value={role}
            onChange={e => setRole(e.target.value)}
            options={roles}
          />
  
          <InputField
            label="Mot de passe"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
  
          <InputField
            label="Confirmer le mot de passe"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
  
          <Button type="submit">S'inscrire</Button>
        </form>
      </div>
    );
  }
  

export default Inscription
