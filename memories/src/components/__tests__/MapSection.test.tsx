import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MapSection } from '../MapSection';

vi.mock('../Map', () => ({
  Map: ({ markers, mapStyle }: { markers: Array<{ title: string }>; mapStyle: string }) => (
    <div data-testid='map' data-map-style={mapStyle}>
      {markers.map((marker, index) => (
        <div key={index} data-testid='marker'>
          {marker.title}
        </div>
      ))}
    </div>
  ),
}));

describe('MapSection Component', () => {
  const markers = [
    {
      position: [48.8566, 2.3522] as [number, number],
      title: 'Paris (1)',
      city: 'Paris',
      testimonies: [],
    },
    {
      position: [45.764, 4.8357] as [number, number],
      title: 'Lyon (1)',
      city: 'Lyon',
      testimonies: [],
    },
  ];

  const defaultProps = {
    markers,
    cities: ['Lyon', 'Paris'],
    selectedCity: '',
    onCityChange: vi.fn(),
  };

  it('renders the title correctly', () => {
    render(<MapSection {...defaultProps} />);
    expect(screen.getByText('Carte des Témoignages')).toBeInTheDocument();
  });

  it('renders the Map component with markers', () => {
    render(<MapSection {...defaultProps} />);
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByText('Paris (1)')).toBeInTheDocument();
    expect(screen.getByText('Lyon (1)')).toBeInTheDocument();
  });
});
