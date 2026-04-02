import React from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from './Menu';
import { Footer } from './Footer';

export const Layout: React.FC = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <header className='w-full bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4'>
          <div className='min-w-0'>
            <h1 className='text-2xl sm:text-4xl md:text-6xl font-bold leading-tight'>
              MEMOIRE(S) EN TRANSIT
            </h1>
            <p className='text-base sm:text-2xl md:text-4xl text-gray-600'>
              Mémoire, exil, identité(s)
            </p>
          </div>
          <div className='relative shrink-0'>
            <Menu />
          </div>
        </div>
      </header>
      <main className='flex-1'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
