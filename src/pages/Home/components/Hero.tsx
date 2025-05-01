import React from 'react'
import { Link } from 'react-router-dom'
import fashionShowcase from '../../../assets/images/fashion-showcase.png'

function Hero() {
  return (
    <section className="relative w-full min-h-[85vh] bg-white overflow-hidden mt-16">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#F4F4F4] opacity-50">
          {/* Motifs géométriques africains subtils */}
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300853F' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[85vh] py-12">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#333333] leading-tight">
                <span className="block text-[#00853F]">Taar<span className="text-[#FDEF00]">u</span><span className="text-[#00853F]">★</span><span className="text-[#FDEF00]">S</span>énégal</span>
                <span className="block text-2xl sm:text-3xl lg:text-4xl mt-4 text-[#333333] font-medium">
                  l'art du sur-mesure,
                </span>
                <span className="block text-2xl sm:text-3xl lg:text-4xl mt-4 text-[#E30B17] font-medium">
                  l'âme du Sénégal
                </span>
              </h1>
              
              <p className="text-xl text-[#333333]/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Unir le talent sénégalais et votre style pour célébrer l'artisanat et inventer la mode de demain. Chaque création rend hommage à notre héritage, fil après fil.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-[#00853F] rounded-lg hover:bg-[#00853F]/90 transition-all duration-300 shadow-lg hover:-translate-y-1"
              >
                Devenir Tailleur Partenaire
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              
              <Link
                to="/formations"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-[#333333] bg-[#FDEF00] rounded-lg hover:bg-[#FDEF00]/90 transition-all duration-300 shadow-lg hover:-translate-y-1"
              >
                Découvrir nos Formations
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="flex-1 relative flex items-center">
            <div className="relative w-full max-w-lg mx-auto">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#00853F] rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#FDEF00] rounded-full opacity-20"></div>
              
              <div className="relative overflow-hidden">
                <img
                  src={fashionShowcase}
                  alt="Créations des tailleurs"
                  className="w-full h-[500px] object-cover object-top transform hover:scale-102 transition-transform duration-500"
                />
                
                {/* Floating Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                  <span className="text-[#00853F] font-semibold">Qualité Premium</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00853F] via-[#FDEF00] to-[#E30B17]"></div>
    </section>
  )
}

export default Hero
