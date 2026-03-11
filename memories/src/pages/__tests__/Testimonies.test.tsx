import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Testimonies } from '../Testimonies';
import { getTestimonies } from '../../infrastructure/get-testimonies';

vi.mock('../../infrastructure/get-testimonies', () => ({
  getTestimonies: vi.fn().mockResolvedValue([
    {
      testimony: 'Un texte',
      genre: 'F',
      testimonyDate: '2024-01-01',
      testimonyCity: 'Paris',
      date: '2024-01-01',
      testimonyLocation: [48.8566, 2.3522],
      testimonyDepartment: '78',
      birthDate: '1985',
      birthPlace: 'Paris',
      testifyingFor: '',
      testimonyConcern: 'Ma soeur',
    },
  ]),
}));

describe('Testimonies Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading then renders list with count', async () => {
    render(<MemoryRouter><Testimonies /></MemoryRouter>);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByTestId('list')).toBeInTheDocument());
    expect(screen.getByTestId('count')).toHaveTextContent('1 témoignage(s)');
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Un texte')).toBeInTheDocument();
    expect(screen.getByText(/Ma soeur/i, { exact: false })).toBeInTheDocument();
  });

  it('shows error when service fails', async () => {
    (getTestimonies as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error('fail')
    );
    render(<MemoryRouter><Testimonies /></MemoryRouter>);
    await waitFor(() => expect(screen.getByTestId('error')).toBeInTheDocument());
    expect(screen.getByTestId('error')).toHaveTextContent('Impossible de charger les témoignages');
  });
});
