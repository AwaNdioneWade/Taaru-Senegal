import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

function PublicLayout() {
    return (
      <div className="w-full min-h-screen">
        <Navbar />
        <main className="w-full">
            <Outlet />
        </main>
        <Footer />
      </div>
    );
  }

export default PublicLayout
