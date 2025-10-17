import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

vi.mock('./infrastructure/get-testimonies.ts', () => ({
  getTestimonies: vi.fn().mockResolvedValue([
    {
      testimony: 'Un témoignage',
      genre: 'F',
      testimonyDate: '2024-01-01',
      testimonyCity: 'Paris',
      testimonyLocation: [48.8566, 2.3522],
    },
  ]),
}));

vi.mock('./application/get-markers.ts', async (orig) => {
  return {
    ...(await orig()),
    getMarkersGrouped: vi.fn().mockResolvedValue([
      {
        position: [48.8566, 2.3522],
        title: 'Paris (1)',
        testimonies: [{ text: 'Un témoignage', genre: 'F', date: '2024-01-01' }],
      },
    ]),
  };
});

vi.mock('./components/MapSection', () => ({
  MapSection: ({
    markers,
  }: {
    markers: Array<{ title: string; testimonies: Array<{ text: string }> }>;
  }) => (
    <div data-testid='map-section'>
      <div data-testid='map-section-markers'>
        {markers.map((marker, index) => (
          <div key={index} data-testid='marker'>
            {marker.title}: {marker.testimonies[0]?.text}
          </div>
        ))}
      </div>
    </div>
  ),
}));

import { getMarkersGrouped } from './application/get-markers.ts';
import App from './App';

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with proper layout classes', async () => {
    render(<App />);
    const mainContainer = await screen.findByTestId('app-container');
    expect(mainContainer).toHaveClass('min-h-screen', 'm-4');
  });

  it('shows loading then renders MapSection after data loads', async () => {
    render(<App />);

    expect(screen.getByText('Chargement des marqueurs...')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByTestId('map-section')).toBeInTheDocument());
  });

  it('provides correct markers to MapSection', async () => {
    render(<App />);
    const markerEls = await screen.findAllByTestId('marker');
    expect(markerEls).toHaveLength(1);
    expect(screen.getByText('Paris (1): Un témoignage')).toBeInTheDocument();
  });

  it('renders within a max-width container with padding', async () => {
    render(<App />);
    const container = await screen.findByTestId('app-container');
    const inner = container.querySelector('div');
    expect(inner).toHaveClass('m-2');
  });

  it('renders MapSection with zero markers when no results', async () => {
    (getMarkersGrouped as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce([]);
    render(<App />);
    await waitFor(() => expect(screen.getByTestId('map-section')).toBeInTheDocument());
    expect(screen.queryAllByTestId('marker')).toHaveLength(0);
  });

  it('renders multiple markers when service returns several', async () => {
    (getMarkersGrouped as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce([
      {
        position: [48.8566, 2.3522],
        title: 'Paris (1)',
        testimonies: [{ text: 'Un A', genre: 'F', date: '2024-01-01' }],
      },
      {
        position: [45.764, 4.8357],
        title: 'Lyon (1)',
        testimonies: [{ text: 'Un B', genre: 'M', date: '2023-01-01' }],
      },
    ]);
    render(<App />);
    const markers = await screen.findAllByTestId('marker');
    expect(markers).toHaveLength(2);
    expect(screen.getByText('Paris (1): Un A')).toBeInTheDocument();
    expect(screen.getByText('Lyon (1): Un B')).toBeInTheDocument();
  });
});
