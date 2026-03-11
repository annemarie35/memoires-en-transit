import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Menu } from '../Menu';

const renderWithRoute = (initial: string) => {
  return render(
    <MemoryRouter initialEntries={[initial]}>
      <Routes>
        <Route path='/' element={<Menu />} />
        <Route path='/temoignages' element={<Menu />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('Menu', () => {
  it('renders both links', () => {
    renderWithRoute('/');
    expect(screen.getByTestId('link-accueil')).toBeInTheDocument();
    expect(screen.getByTestId('link-temoignages')).toBeInTheDocument();
  });

  it('highlights Accueil when on /', () => {
    renderWithRoute('/');
    const accueil = screen.getByTestId('link-accueil');
    const temoignages = screen.getByTestId('link-temoignages');
    expect(accueil.className).toMatch(
      'px-3 py-2 rounded hover:bg-gray-100bg-gray-S00 bg-gray-200 font-semibold'
    );
    expect(temoignages.className).not.toMatch(/text-yellow-900/);
  });

  it('highlights Témoignages when on /temoignages', () => {
    renderWithRoute('/temoignages');
    const accueil = screen.getByTestId('link-accueil');
    const temoignages = screen.getByTestId('link-temoignages');
    expect(temoignages.className).toMatch(
      'px-3 py-2 rounded hover:bg-gray-100bg-gray-S00 bg-gray-200 font-semibold'
    );
    expect(accueil.className).not.toMatch(/text-yellow-900/);
  });
});
