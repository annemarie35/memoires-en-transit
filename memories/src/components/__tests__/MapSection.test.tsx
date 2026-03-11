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
      title: 'Paris',
      testimonies: [],
    },
    {
      position: [45.764, 4.8357] as [number, number],
      title: 'Lyon',
      testimonies: [],
    },
  ];

  it('renders the title correctly', () => {
    render(<MapSection markers={markers} />);
    expect(screen.getByText('Carte des Témoignages')).toBeInTheDocument();
  });

  it('renders the Map component with markers', () => {
    render(<MapSection markers={markers} />);
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Lyon')).toBeInTheDocument();
  });
});
