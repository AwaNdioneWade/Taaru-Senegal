import { useState } from 'react';
import {
  Camera,
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  Award,
  Edit,
  Save,
  X,
} from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Fatou Ndiaye',
    location: 'Dakar, Sénégal',
    phone: '+221 77 123 45 67',
    email: 'fatou.ndiaye@example.com',
    specialties: ['Bazin', 'Couture homme', 'Grande robe'],
    availability: [
      { day: 'Lundi', hours: '9h - 18h' },
      { day: 'Mardi', hours: '9h - 18h' },
      { day: 'Mercredi', hours: '9h - 18h' },
      { day: 'Jeudi', hours: '9h - 18h' },
      { day: 'Vendredi', hours: '9h - 18h' },
    ],
    rating: 4.8,
    totalOrders: 156,
    isCertified: true,
  });

  const handleSave = () => {
    // TODO: Implement save functionality
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Mon Profil</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 text-sm font-medium text-white bg-[#00853F] rounded-lg hover:bg-[#0d301d]"
        >
          {isEditing ? (
            <>
              <X className="inline-block w-4 h-4 mr-2" />
              Annuler
            </>
          ) : (
            <>
              <Edit className="inline-block w-4 h-4 mr-2" />
              Modifier
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="relative">
              <div className="aspect-square w-32 mx-auto rounded-full overflow-hidden bg-gray-100">
                <img
                  src="/avatar-placeholder.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-2 text-white bg-[#00853F] rounded-full hover:bg-[#0d301d]">
                  <Camera className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="mt-6 space-y-4">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900">{profile.name}</h2>
                {profile.isCertified && (
                  <span className="inline-flex items-center px-3 py-1 mt-2 text-sm font-medium text-purple-700 bg-purple-100 rounded-full">
                    <Award className="w-4 h-4 mr-1" />
                    Certifié Diaspora
                  </span>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-3" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-3" />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 mr-3" />
                  <span>{profile.email}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="ml-2 text-gray-900">{profile.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {profile.totalOrders} commandes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Specialties */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Mes Spécialités</h3>
            <div className="flex flex-wrap gap-2">
              {profile.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm font-medium text-[#00853F] bg-[#c5f0d9] rounded-full"
                >
                  {specialty}
                </span>
              ))}
              {isEditing && (
                <button className="px-3 py-1 text-sm font-medium text-[#00853F] border border-[#00853F] rounded-full hover:bg-[#c5f0d9]">
                  + Ajouter
                </button>
              )}
            </div>
          </div>

          {/* Availability */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Disponibilités</h3>
            <div className="space-y-3">
              {profile.availability.map((slot, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="font-medium text-gray-900">{slot.day}</span>
                  </div>
                  <span className="text-gray-600">{slot.hours}</span>
                </div>
              ))}
              {isEditing && (
                <button className="w-full px-4 py-2 text-sm font-medium text-[#00853F] border border-[#00853F] rounded-lg hover:bg-[#c5f0d9]">
                  + Ajouter un créneau
                </button>
              )}
            </div>
          </div>

          {/* Gallery Link */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ma Galerie Publique</h3>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Lien de votre galerie</p>
                <p className="text-sm font-medium text-gray-900">
                  taaru.sn/tailor/fatou-ndiaye
                </p>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-white bg-[#00853F] rounded-lg hover:bg-[#0d301d]">
                Copier le lien
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      {isEditing && (
        <div className="fixed bottom-6 right-6">
          <button
            onClick={handleSave}
            className="px-6 py-3 text-sm font-medium text-white bg-[#00853F] rounded-lg shadow-lg hover:bg-[#0d301d]"
          >
            <Save className="inline-block w-4 h-4 mr-2" />
            Enregistrer les modifications
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile; 