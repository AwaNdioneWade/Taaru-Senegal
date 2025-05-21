import React from 'react';
import { Link } from 'react-router-dom';
import Hero from './components/Hero';
import Evenements from './components/Evenements';
import Services from './components/Services';
import Creations from './components/Creations/Creation';
import PourquoiNous from './PourquoiNous';
import Temoignages from './Temoignages';
import Partenaires from './Partenaires';
import Newsletter from './Newsletter';
function Home() {
  return (
    <div className="w-full space-y-16">
      {/* Hero Section */}
      <Hero />

      {/* Créations Section */}
      <Creations />

      {/* Événements Section */}
      <Evenements />

      {/* Services Section */}
      <Services />

      {/* Pourquoi Nous Section */}
      <PourquoiNous />

      {/* Temoignages Section */}
      <Temoignages />

      {/* Partenaires Section */}
      <Partenaires />

      {/* Newsletter Section */}
      <Newsletter />

    </div>
  );
}

export default Home;
