import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const services = [
  {
    id: 'tailleurs',
    icon: <i className="fas fa-scissors text-[#00853F] text-3xl"></i>,
    title: 'Pour les Tailleurs',
    desc: "Gérez vos créations, développez votre clientèle et bénéficiez d'outils sur-mesure.",
    badge: 'Populaire'
  },
  {
    id: 'clients',
    icon: <i className="fas fa-user-friends text-[#FDEF00] text-3xl"></i>,
    title: 'Pour les Clients',
    desc: 'Découvrez les meilleurs artisans, commandez en toute confiance et suivez vos projets.'
  },
  {
    id: 'tissus',
    icon: <i className="fas fa-tshirt text-[#E30B17] text-3xl"></i>,
    title: 'Tissus',
    desc: 'Explorez une sélection de tissus de qualité, tendances et traditionnels.',
    badge: 'Nouveau'
  },
  {
    id: 'accessoires',
    icon: <i className="fas fa-gem text-[#00853F] text-3xl"></i>,
    title: 'Accessoires',
    desc: 'Complétez votre style avec des accessoires uniques et faits main.'
  }
];

const sectionRefs: { [key: string]: React.RefObject<HTMLDivElement> } = {
  tailleurs: React.createRef(),
  clients: React.createRef(),
  tissus: React.createRef(),
  accessoires: React.createRef(),
};

const avantages = [
  {
    icon: <i className="fas fa-star text-[#FDEF00] text-2xl"></i>,
    title: 'Qualité garantie',
    desc: 'Des artisans sélectionnés pour leur savoir-faire et leur sérieux.'
  },
  {
    icon: <i className="fas fa-users text-[#00853F] text-2xl"></i>,
    title: 'Communauté active',
    desc: "Un réseau d'entraide et de partage entre passionnés."
  },
  {
    icon: <i className="fas fa-bolt text-[#E30B17] text-2xl"></i>,
    title: 'Innovation',
    desc: 'Des outils modernes pour faciliter la vie des créateurs et des clients.'
  }
];

const Services: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const ref = sectionRefs[id];
      if (ref && ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location]);

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header immersif */}
      <div className="relative h-[320px] flex items-center justify-center mb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00853F]/80 to-[#FDEF00]/60 z-10" />
        <img
          src="/gallery/robe1.jpg"
          alt="Services Taaru Sénégal"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40 blur-sm z-0"
        />
        <div className="relative z-20 text-center px-4 animate-fade-in-up">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00853F] to-[#FDEF00] flex items-center justify-center text-4xl shadow-xl border-4 border-white animate-fade-in-up">
              <i className="fas fa-concierge-bell"></i>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-3 animate-fade-in-up">Nos Services</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto animate-fade-in-up">Découvrez tout ce que Taaru Sénégal peut vous offrir, que vous soyez tailleur, client, passionné de tissus ou d'accessoires.</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4">
        {/* Grille de services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
          {services.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`relative bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-8 flex flex-col items-center hover:scale-105 hover:shadow-2xl hover:border-[#00853F] border-2 border-transparent transition-all duration-300 group animate-fade-in-up`}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <div className="mb-4 relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00853F] to-[#FDEF00] flex items-center justify-center text-3xl text-white shadow-lg group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
                  {s.icon}
                </div>
                {s.badge && (
                  <span className="absolute -top-2 -right-2 bg-[#E30B17] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md border-2 border-white animate-fade-in-up">{s.badge}</span>
                )}
              </div>
              <h3 className="font-semibold text-xl mb-2 group-hover:text-[#00853F] transition-colors">{s.title}</h3>
              <p className="text-gray-600 text-center mb-2">{s.desc}</p>
              <span className="mt-2 px-4 py-2 bg-[#00853F] text-white rounded-lg font-semibold group-hover:bg-[#FDEF00] group-hover:text-[#00853F] transition-colors shadow">Découvrir</span>
            </a>
          ))}
        </div>
        {/* Section avantages */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-[#00853F] mb-8 text-center animate-fade-in-up">Pourquoi choisir Taaru Sénégal ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {avantages.map((a, i) => (
              <div key={i} className="bg-white/80 rounded-2xl shadow-lg p-8 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${i * 0.15 + 0.2}s` }}>
                <div className="mb-3">{a.icon}</div>
                <h4 className="font-semibold text-lg mb-2 text-[#00853F]">{a.title}</h4>
                <p className="text-gray-600 text-center">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Sections détaillées */}
        {services.map((s, i) => (
          <div
            key={s.id}
            id={s.id}
            ref={sectionRefs[s.id]}
            className="mb-20 scroll-mt-32"
          >
            <div className="flex flex-col md:flex-row items-center gap-8 bg-white/80 rounded-2xl shadow-lg p-8 animate-fade-in-up" style={{ animationDelay: `${i * 0.12 + 0.3}s` }}>
              <div className="mb-4 md:mb-0 md:mr-8 flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00853F] to-[#FDEF00] flex items-center justify-center text-3xl text-white shadow-lg">
                  {s.icon}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#00853F] mb-2">{s.title}</h2>
                <p className="text-gray-700 text-lg mb-2">{s.desc}</p>
                {/* Ajoute ici une description détaillée, des avantages, des exemples, etc. */}
                <ul className="list-disc pl-6 space-y-1 text-gray-600">
                  <li>Avantage 1 du service {s.title.toLowerCase()}</li>
                  <li>Avantage 2 du service {s.title.toLowerCase()}</li>
                  <li>Avantage 3 du service {s.title.toLowerCase()}</li>
                </ul>
              </div>
            </div>
          </div>
        ))}
        {/* Call to action */}
        <div className="text-center py-12 bg-gradient-to-r from-[#00853F]/10 via-[#FDEF00]/10 to-[#E30B17]/10 rounded-2xl shadow-xl animate-fade-in-up mb-10">
          <h2 className="text-2xl font-bold text-[#00853F] mb-2">Prêt à rejoindre la communauté ?</h2>
          <p className="text-gray-700 mb-4">Inscrivez-vous ou contactez-nous pour profiter de tous nos services et rejoindre l'aventure Taaru Sénégal !</p>
          <a
            href="/register"
            className="inline-block px-8 py-4 bg-[#00853F] text-white rounded-xl font-semibold text-lg hover:bg-[#FDEF00] hover:text-[#00853F] transition-colors shadow-xl"
          >
            S'inscrire
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services; 