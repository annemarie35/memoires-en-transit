import React from 'react';
import { NavLink } from 'react-router-dom';

export const Menu: React.FC = () => {
  const base = 'px-3 py-2 rounded hover:bg-gray-100';
  const active = 'bg-gray-S00 bg-gray-200 font-semibold';

  return (
    <nav className='flex items-center gap-4'>
      <NavLink
        to='/'
        className={({ isActive }) => base + (isActive ? active : '')}
        data-testid='link-accueil'
        end
      >
        Accueil
      </NavLink>
      <NavLink
        to='/temoignages'
        className={({ isActive }) => base + (isActive ? active : '')}
        data-testid='link-temoignages'
      >
        Témoignages
      </NavLink>
      <NavLink
        to='/apropos'
        className={({ isActive }) => base + (isActive ? active : '')}
        data-testid='link-apropos'
      >
        À propos
      </NavLink>
    </nav>
  );
};
