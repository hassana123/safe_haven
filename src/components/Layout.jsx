import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header>
        <Navbar />
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-gray-100 py-4 text-center">
        <p className="text-sm text-gray-600">&copy; 2023 Safe Haven. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;