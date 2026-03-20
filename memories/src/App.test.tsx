import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';

import { getMarkersGrouped } from './application/get-markers.ts';
import { getTestimonies } from './infrastructure/get-testimonies.ts';
import App from './App';

describe('App Component', () => {
  beforeEach(() => {
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

    vi.mock('./application/get-markers.ts', () => ({
      getMarkersGrouped: vi.fn().mockResolvedValue([
        {
          position: [48.8566, 2.3522],
          title: 'Paris (1)',
          city: 'Paris',
          testimonies: [{ text: 'Un témoignage', genre: 'F', date: '2024-01-01' }],
        },
      ]),
      getCitiesFromMarkers: vi.fn().mockReturnValue(['Paris']),
    }));

    vi.mock('./components/MapSection', () => ({
      MapSection: ({
        markers,
        onCityChange,
      }: {
        markers: Array<{ title: string; city: string; testimonies: Array<{ text: string }> }>;
        onCityChange?: (city: string) => void;
      }) => (
        <div data-testid='map-section'>
          <select
            data-testid='city-select'
            onChange={(e) => onCityChange?.(e.target.value)}
            defaultValue=''
          >
            <option value=''>Toutes les villes</option>
            {markers.map((marker) => (
              <option key={marker.city} value={marker.city}>
                {marker.city}
              </option>
            ))}
          </select>
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
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders within a max-width container with padding', async () => {
    render(<App />);
    const container = await screen.findByTestId('app-container');
    expect(container).toHaveClass('max-w-6xl', 'mx-auto', 'p-4');
  });

  it('renders MapSection with zero markers when no results', async () => {
    vi.mocked(getMarkersGrouped).mockResolvedValueOnce([]);
    render(<App />);
    await waitFor(() => expect(screen.getByTestId('map-section')).toBeInTheDocument());
    expect(screen.queryAllByTestId('marker')).toHaveLength(0);
  });
  it('shows loading then renders MapSection after data loads', async () => {
    render(<App />);

    expect(screen.getByText('Chargement des marqueurs...')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByTestId('map-section')).toBeInTheDocument());
  });

  describe('Get testimonies', () => {
    it('hides loading message after data loads', async () => {
      render(<App />);
      expect(screen.getByText('Chargement des marqueurs...')).toBeInTheDocument();
      await waitFor(() => expect(screen.queryByText('Chargement des marqueurs...')).toBeNull());
    });

    it('shows an error when getTestimonies fails (specific message)', async () => {
      vi.mocked(getTestimonies).mockRejectedValueOnce(new Error('api down'));
      render(<App />);
      await waitFor(() => expect(screen.getByTestId('error')).toBeInTheDocument());
      expect(screen.getByTestId('error')).toHaveTextContent(
        'Impossible de charger les témoignages'
      );
    });

    it('applies orange style and alert icon when getTestimonies fails', async () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
      vi.mocked(getTestimonies).mockRejectedValueOnce(new Error('api down'));

      render(<App />);

      const errorEl = await screen.findByTestId('error');
      expect(errorEl.className).toMatch(/text-orange-600/);
      // svg icône orange présent dans le container
      const svgs = errorEl.querySelectorAll('svg');
      expect(svgs.length).toBeGreaterThan(0);
      const hasOrangeIcon = Array.from(svgs).some(
        (s) =>
          s.className.baseVal?.includes('text-orange-500') ||
          s.getAttribute('class')?.includes('text-orange-500')
      );
      expect(hasOrangeIcon).toBe(true);

      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });

  describe('Filter testimonies by city', () => {
    it('filters markers by city when a city is selected', async () => {
      vi.mocked(getMarkersGrouped).mockResolvedValueOnce([
        {
          position: [48.8566, 2.3522],
          title: 'Paris (1)',
          city: 'Paris',
          testimonies: [{ text: 'Témoignage Paris', genre: 'F', date: '2024-01-01' }],
        },
        {
          position: [45.764, 4.8357],
          title: 'Lyon (1)',
          city: 'Lyon',
          testimonies: [{ text: 'Témoignage Lyon', genre: 'M', date: '2023-01-01' }],
        },
      ]);

      render(<App />);

      await waitFor(() => expect(screen.getByTestId('map-section')).toBeInTheDocument());
      expect(screen.getAllByTestId('marker')).toHaveLength(2);

      fireEvent.change(screen.getByTestId('city-select'), { target: { value: 'Lyon' } });

      await waitFor(() => expect(screen.getAllByTestId('marker')).toHaveLength(1));
      expect(screen.getByText('Lyon (1): Témoignage Lyon')).toBeInTheDocument();
      expect(screen.queryByText('Paris (1): Témoignage Paris')).toBeNull();
    });
  });

  describe('Get markers grouped', () => {
    it('provides correct markers to MapSection', async () => {
      render(<App />);
      const markerEls = await screen.findAllByTestId('marker');
      expect(markerEls).toHaveLength(1);
      expect(screen.getByText('Paris (1): Un témoignage')).toBeInTheDocument();
    });

    it('renders multiple markers when service returns several', async () => {
      vi.mocked(getMarkersGrouped).mockResolvedValueOnce([
        {
          position: [48.8566, 2.3522],
          title: 'Paris (1)',
          city: 'Paris',
          testimonies: [{ text: 'Un A', genre: 'F', date: '2024-01-01' }],
        },
        {
          position: [45.764, 4.8357],
          title: 'Lyon (1)',
          city: 'Lyon',
          testimonies: [{ text: 'Un B', genre: 'M', date: '2023-01-01' }],
        },
      ]);
      render(<App />);
      const markers = await screen.findAllByTestId('marker');
      expect(markers).toHaveLength(2);
      expect(screen.getByText('Paris (1): Un A')).toBeInTheDocument();
      expect(screen.getByText('Lyon (1): Un B')).toBeInTheDocument();
    });

    it('calls getMarkersGrouped with the testimonies returned by getTestimonies', async () => {
      // const sample = [
      //   {
      //     testimony: 'X',
      //     genre: 'F',
      //     testimonyDate: '2024-05-05',
      //     testimonyCity: 'Nice',
      //     testimonyLocation: [43.7, 7.26],
      //   },
      // ];
      // vi.mocked(getTestimonies).mockResolvedValueOnce(sample);

      render(<App />);

      await waitFor(() => expect(getMarkersGrouped).toHaveBeenCalled());
      expect(getMarkersGrouped).toHaveBeenCalledWith([
        {
          testimony: 'Un témoignage',
          genre: 'F',
          testimonyDate: '2024-01-01',
          testimonyCity: 'Paris',
          testimonyLocation: [48.8566, 2.3522],
        },
      ]);
    });

    it('applies blue style and cog icon when getMarkersGrouped fails', async () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
      vi.mocked(getMarkersGrouped).mockRejectedValueOnce(new Error('grouping failed'));

      render(<App />);

      const errorEl = await screen.findByTestId('error');
      expect(errorEl.className).toMatch(/text-yellow-900/);
      // svg icône bleue présent dans le container
      const svgs = errorEl.querySelectorAll('svg');
      expect(svgs.length).toBeGreaterThan(0);
      const hasBlueIcon = Array.from(svgs).some(
        (s) =>
          s.className.baseVal?.includes('text-blue-500') ||
          s.getAttribute('class')?.includes('text-blue-500')
      );
      expect(hasBlueIcon).toBe(true);

      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('shows an error when getMarkersGrouped fails (specific message)', async () => {
      vi.mocked(getMarkersGrouped).mockRejectedValueOnce(new Error('grouping failed'));
      render(<App />);
      await waitFor(() => expect(screen.getByTestId('error')).toBeInTheDocument());
      expect(screen.getByTestId('error')).toHaveTextContent('Impossible de préparer les marqueurs');
    });

    it('shows an error message if markers loading fails', async () => {
      // force l'échec de getMarkersGrouped
      vi.mocked(getMarkersGrouped).mockRejectedValueOnce(new Error('boom'));
      render(<App />);
      await waitFor(() => expect(screen.getByTestId('error')).toBeInTheDocument());
      expect(screen.queryByText('Chargement des marqueurs...')).toBeNull();
      expect(screen.getByTestId('error')).toHaveTextContent('Impossible de préparer les marqueur');
    });
  });
});
