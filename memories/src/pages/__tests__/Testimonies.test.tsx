import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Testimonies } from '../Testimonies';

vi.mock('../../infrastructure/get-testimonies', () => ({
  getTestimonies: vi.fn().mockResolvedValue([
    {
      testimony: 'Un texte',
      genre: 'F',
      testimonyDate: '2024-01-01',
      testimonyCity: 'Paris',
      testimonyLocation: [48.8566, 2.3522],
    },
  ]),
}));

import { getTestimonies } from '../../infrastructure/get-testimonies';

describe('Testimonies Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading then renders list with count', async () => {
    render(<Testimonies />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByTestId('list')).toBeInTheDocument());
    expect(screen.getByTestId('count')).toHaveTextContent('1 témoignage(s)');
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Un texte')).toBeInTheDocument();
  });

  it('shows error when service fails', async () => {
    (getTestimonies as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('fail'));
    render(<Testimonies />);
    await waitFor(() => expect(screen.getByTestId('error')).toBeInTheDocument());
    expect(screen.getByTestId('error')).toHaveTextContent('Impossible de charger les témoignages');
  });
});
