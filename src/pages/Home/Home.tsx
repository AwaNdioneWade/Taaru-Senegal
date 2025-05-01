import React from 'react';
import { Link } from 'react-router-dom';
import Hero from './components/Hero';
import Evenements from './components/Evenements';

function Home() {
  return (
    <div className="w-full space-y-16">
      {/* Hero Section */}
      <Hero />

      {/* Événements Section */}
      <Evenements />
    </div>
  );
}

export default Home;
