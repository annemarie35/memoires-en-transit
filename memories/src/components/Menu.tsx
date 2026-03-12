import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const Menu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const base = 'px-3 py-2 rounded hover:bg-gray-100';
  const active = 'bg-gray-S00 bg-gray-200 font-semibold';

  const links = (
    <>
      <NavLink
        to='/'
        className={({ isActive }) => base + (isActive ? active : '')}
        data-testid='link-accueil'
        end
        onClick={() => setOpen(false)}
      >
        Accueil
      </NavLink>
      <NavLink
        to='/temoignages'
        className={({ isActive }) => base + (isActive ? active : '')}
        data-testid='link-temoignages'
        onClick={() => setOpen(false)}
      >
        Témoignages
      </NavLink>
      <NavLink
        to='/apropos'
        className={({ isActive }) => base + (isActive ? active : '')}
        data-testid='link-apropos'
        onClick={() => setOpen(false)}
      >
        À propos
      </NavLink>
    </>
  );

  return (
    <nav className='text-xl'>
      {/* Desktop */}
      <div className='hidden md:flex items-center gap-4'>{links}</div>

      {/* Mobile burger button */}
      <button
        className='md:hidden p-2 rounded hover:bg-gray-100'
        onClick={() => setOpen((o) => !o)}
        aria-label='Menu'
      >
        <span className='block w-6 h-0.5 bg-gray-800 mb-1.5'></span>
        <span className='block w-6 h-0.5 bg-gray-800 mb-1.5'></span>
        <span className='block w-6 h-0.5 bg-gray-800'></span>
      </button>

      {/* Mobile dropdown */}
      {open && (
        <div className='md:hidden absolute right-0 top-full mt-1 bg-white shadow-lg rounded flex flex-col p-2 z-50'>
          {links}
        </div>
      )}
    </nav>
  );
};
