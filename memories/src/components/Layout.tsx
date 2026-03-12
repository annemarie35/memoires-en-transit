import React from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from './Menu';

export const Layout: React.FC = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <header className='w-full bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
          <div>
            <h1 className='text-6xl font-bold'>MEMOIRE(S) EN TRANSIT</h1>
            <p className='text-4xl text-gray-600'>Filiation, exil, identité(s)</p>
          </div>
          <div className='relative'>
            <Menu />
          </div>
        </div>
      </header>
      <main className='flex-1'>
        <Outlet />
      </main>
    </div>
  );
};
