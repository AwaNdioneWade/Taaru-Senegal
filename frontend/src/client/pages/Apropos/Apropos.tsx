import React from 'react';

const timeline = [
  { year: '2025', event: "Naissance de l'idée Taaru Sénégal" },
  { year: '2025', event: 'Développement de la plateforme et premiers partenariats' },
  { year: '2026', event: 'Lancement officiel et premières créations en ligne' },
];

const team = [
  {
    name: 'Wade Masser',
    role: 'Fondateur & Développeur',
    avatar: '', // Ajoute une URL d'image si tu veux
    color: 'from-[#00853F] to-[#FDEF00]'
  },
  // Ajoute d'autres membres ici
];

const Apropos: React.FC = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header immersif */}
      <div className="relative h-[340px] md:h-[420px] flex items-center justify-center overflow-hidden mb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00853F]/80 to-[#FDEF00]/60 z-10" />
        <img
          src="/gallery/robe1.jpg"
          alt="Fond Taaru Sénégal"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40 blur-sm z-0"
        />
        <div className="relative z-20 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4">Taaru Sénégal</h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl mx-auto mb-4 drop-shadow">Célébrons la beauté, la créativité et l'authenticité de la mode et de l'artisanat sénégalais.</p>
          <span className="inline-block bg-white/90 text-[#00853F] px-6 py-2 rounded-full font-semibold shadow-lg text-lg">Notre histoire, nos valeurs, notre passion</span>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-5xl mx-auto px-4 md:px-0 mb-16 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-[#00853F] mb-4">Notre mission</h2>
          <p className="text-lg text-gray-700 mb-4">
            Taaru Sénégal est née de la volonté de mettre en lumière le talent des artisans et créateurs sénégalais. Nous voulons offrir une vitrine moderne à la richesse de notre patrimoine textile et créatif, et connecter les passionnés du monde entier à cette énergie unique.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Valoriser l'artisanat et la mode locale</li>
            <li>Encourager l'innovation et la transmission</li>
            <li>Créer une communauté inspirante et solidaire</li>
          </ul>
        </div>
        <div className="flex-1 flex justify-center">
          <img src="/gallery/accessoire1.jpg" alt="Artisanat Sénégal" className="rounded-2xl shadow-xl w-80 h-80 object-cover object-center border-4 border-[#FDEF00]" />
        </div>
      </div>

      {/* Valeurs en cartes */}
      <div className="max-w-5xl mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold text-[#00853F] mb-8 text-center">Nos valeurs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Authenticité */}
          <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-xl p-8 flex flex-col items-center border-2 border-transparent hover:border-[#00853F] hover:scale-105 hover:bg-white/80 transition-all duration-300 group animate-fade-in-up">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-[#00853F] to-[#FDEF00] mb-4 shadow-lg group-hover:scale-110 transition-transform">
              <span className="text-3xl">🌍</span>
            </div>
            <h3 className="font-semibold text-xl mb-2 text-[#00853F]">Authenticité</h3>
            <p className="text-gray-600 text-center">Mettre en avant le savoir-faire et la culture sénégalaise.</p>
          </div>
          {/* Communauté */}
          <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-xl p-8 flex flex-col items-center border-2 border-transparent hover:border-[#FDEF00] hover:scale-105 hover:bg-white/80 transition-all duration-300 group animate-fade-in-up delay-100">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-[#FDEF00] to-[#00853F] mb-4 shadow-lg group-hover:scale-110 transition-transform">
              <span className="text-3xl">🤝</span>
            </div>
            <h3 className="font-semibold text-xl mb-2 text-[#FDEF00]">Communauté</h3>
            <p className="text-gray-600 text-center">Créer des liens entre artisans, créateurs et passionnés.</p>
          </div>
          {/* Innovation */}
          <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-xl p-8 flex flex-col items-center border-2 border-transparent hover:border-[#E30B17] hover:scale-105 hover:bg-white/80 transition-all duration-300 group animate-fade-in-up delay-200">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-[#E30B17] to-[#FDEF00] mb-4 shadow-lg group-hover:scale-110 transition-transform">
              <span className="text-3xl">✨</span>
            </div>
            <h3 className="font-semibold text-xl mb-2 text-[#E30B17]">Innovation</h3>
            <p className="text-gray-600 text-center">Allier tradition et modernité pour inspirer de nouvelles tendances.</p>
          </div>
        </div>
      </div>

      {/* Timeline / Notre histoire */}
      <div className="max-w-5xl mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold text-[#00853F] mb-8 text-center">Notre histoire</h2>
        <div className="relative border-l-4 border-[#FDEF00] pl-12 space-y-12">
          {timeline.map((step, idx) => (
            <div key={idx} className="relative flex items-center min-h-[80px]">
              {/* Badge année bien centré */}
              <div className="flex-shrink-0 flex items-center justify-center absolute -left-8 top-1/2 -translate-y-1/2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00853F] to-[#FDEF00] flex items-center justify-center text-white font-bold text-lg shadow-lg border-4 border-white">
                  {step.year}
                </div>
              </div>
              {/* Carte texte */}
              <div className="bg-white rounded-lg shadow p-5 ml-8 w-full">
                <p className="text-gray-700 text-lg">{step.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Équipe stylée */}
      <div className="max-w-5xl mx-auto px-4 mb-16 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-[#00853F] mb-8 text-center">L'équipe</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-center">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="bg-white/60 backdrop-blur-md rounded-3xl shadow-xl p-8 flex flex-col items-center border-2 border-transparent hover:border-[#00853F] hover:scale-105 transition-all duration-300 group animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.12}s` }}
            >
              <div className="relative mb-4">
                <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-4xl font-bold text-white shadow-2xl border-4 border-white group-hover:scale-110 group-hover:shadow-[0_0_0_8px_rgba(0,133,63,0.15)] transition-all duration-300`}>
                  {member.avatar ? (
                    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover rounded-full" />
                  ) : (
                    member.name[0]
                  )}
                </div>
                <span className="absolute -bottom-2 -right-2 bg-[#FDEF00] text-[#00853F] px-3 py-1 rounded-full text-xs font-bold shadow-md border-2 border-white">Équipe</span>
              </div>
              <h4 className="font-semibold text-lg text-[#00853F] mb-1">{member.name}</h4>
              <p className="text-gray-500 text-sm mb-2">{member.role}</p>
              <span className="text-xs text-gray-400 italic">"Coder aujourd’hui les traditions de demain."</span>
            </div>
          ))}
        </div>
      </div>

      {/* Call to action contact */}
      <div className="text-center py-12 bg-gradient-to-r from-[#00853F]/10 via-[#FDEF00]/10 to-[#E30B17]/10">
        <h2 className="text-2xl font-bold text-[#00853F] mb-2">Contact</h2>
        <p className="text-gray-700 mb-4">Une question, une suggestion ou envie de rejoindre l'aventure ?</p>
        <a
          href="/contact"
          className="inline-block px-8 py-4 bg-[#00853F] text-white rounded-xl font-semibold text-lg hover:bg-[#FDEF00] hover:text-[#00853F] transition-colors shadow-xl"
        >
          Écrivez-nous
        </a>
      </div>
    </section>
  );
};

export default Apropos;
