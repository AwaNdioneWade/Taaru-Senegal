import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col mt-20">
      {/* Header immersif */}
      <div className="relative h-[260px] flex items-center justify-center mb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00853F]/80 to-[#FDEF00]/60 z-10" />
        <img
          src="/gallery/robe1.jpg"
          alt="Contact Taaru Sénégal"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40 blur-sm z-0"
        />
        <div className="relative z-20 text-center px-4">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00853F] to-[#FDEF00] flex items-center justify-center text-4xl shadow-xl border-4 border-white animate-fade-in-up">
              <span role="img" aria-label="Contact">✉️</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-2 animate-fade-in-up">Contactez-nous</h1>
          <p className="text-lg text-white/90 max-w-xl mx-auto animate-fade-in-up">Une question, une suggestion, un projet ? Écrivez-nous, nous serons ravis d'échanger avec vous !</p>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-5xl mx-auto w-full flex flex-col md:flex-row gap-12 px-4 mb-16">
        {/* Bloc infos contact */}
        <div className="flex-1 flex flex-col gap-6 justify-center animate-fade-in-up">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-6 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00853F] to-[#FDEF00] flex items-center justify-center mb-2 text-2xl text-white shadow-lg">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <span className="font-semibold text-gray-700">contact@taaru-senegal.com</span>
          </div>
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-6 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FDEF00] to-[#00853F] flex items-center justify-center mb-2 text-2xl text-white shadow-lg">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            </div>
            <span className="font-semibold text-gray-700">+221 77 123 45 67</span>
          </div>
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-6 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#E30B17] to-[#FDEF00] flex items-center justify-center mb-2 text-2xl text-white shadow-lg">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <span className="font-semibold text-gray-700">Dakar, Sénégal</span>
          </div>
          {/* Réseaux sociaux */}
          <div className="flex justify-center gap-4 mt-8">
            <a href="#" className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00853F] to-[#FDEF00] flex items-center justify-center text-white text-2xl shadow-lg hover:scale-110 hover:bg-[#FDEF00] hover:text-[#00853F] transition-all duration-300" title="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00853F] to-[#FDEF00] flex items-center justify-center text-white text-2xl shadow-lg hover:scale-110 hover:bg-[#FDEF00] hover:text-[#00853F] transition-all duration-300" title="Facebook"><i className="fab fa-facebook"></i></a>
            <a href="#" className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00853F] to-[#FDEF00] flex items-center justify-center text-white text-2xl shadow-lg hover:scale-110 hover:bg-[#FDEF00] hover:text-[#00853F] transition-all duration-300" title="Twitter"><i className="fab fa-twitter"></i></a>
          </div>
        </div>
        {/* Formulaire de contact */}
        <form onSubmit={handleSubmit} className="flex-1 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 flex flex-col gap-6 animate-fade-in-up mt-10 md:mt-0">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-semibold text-gray-700">Nom</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00853F] focus:ring-2 focus:ring-[#00853F]/20 outline-none bg-white/80 transition"
              placeholder="Votre nom"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00853F] focus:ring-2 focus:ring-[#00853F]/20 outline-none bg-white/80 transition"
              placeholder="Votre email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="font-semibold text-gray-700">Message</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              className="px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00853F] focus:ring-2 focus:ring-[#00853F]/20 outline-none bg-white/80 transition resize-none"
              placeholder="Votre message..."
            />
          </div>
          <button
            type="submit"
            className="mt-2 px-8 py-3 bg-[#00853F] text-white rounded-xl font-semibold text-lg hover:from-[#FDEF00] hover:to-[#00853F] hover:text-[#00853F] transition-all shadow-xl flex items-center justify-center gap-2 group"
          >
            <span>Envoyer</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
          {sent && (
            <div className="text-center text-[#00853F] font-semibold mt-2 animate-fade-in-up">Merci pour votre message !</div>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;

/* Ajoute dans ton CSS global ou tailwind.config.js si pas déjà fait :
@keyframes fade-in-up {
  0% { opacity: 0; transform: translateY(40px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fade-in-up 0.8s cubic-bezier(0.23, 1, 0.32, 1) both;
}
*/
