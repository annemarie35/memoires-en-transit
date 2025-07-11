import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock MapSection instead of Map
vi.mock('./components/MapSection', () => ({
  MapSection: ({ markers }: { markers: Array<{ title: string; description: string }> }) => (
    <div data-testid='map-section'>
      <h1>Carte des Souvenirs</h1>
      <div data-testid='map-section-markers'>
        {markers.map((marker, index) => (
          <div key={index} data-testid='marker'>
            {marker.title}: {marker.description}
          </div>
        ))}
      </div>
    </div>
  ),
}));

describe('App Component', () => {
  it('renders with proper layout classes', () => {
    render(<App />);
    const mainContainer = screen.getByTestId('app-container');
    expect(mainContainer).toHaveClass('min-h-screen', 'bg-gray-100');
  });

  it('renders the MapSection component', () => {
    render(<App />);
    expect(screen.getByTestId('map-section')).toBeInTheDocument();
  });

  it('provides correct markers to MapSection', () => {
    render(<App />);
    const markers = screen.getAllByTestId('marker');
    expect(markers).toHaveLength(4);

    expect(screen.getByText('Paris: La ville lumière')).toBeInTheDocument();
    expect(screen.getByText('Lyon: La capitale de la gastronomie')).toBeInTheDocument();
    expect(screen.getByText("Gare d'Austerlitz: Gare d'Austerlitz")).toBeInTheDocument();
    expect(screen.getByText('Gare de Hendaye: Gare de Hendaye')).toBeInTheDocument();
  });

  it('renders within a max-width container with padding', () => {
    render(<App />);
    const container = screen.getByTestId('app-container').querySelector('div');
    expect(container).toHaveClass('max-w-6xl', 'mx-auto', 'p-8');
  });
});
