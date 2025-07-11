import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MapSection } from '../MapSection';
import type { MapType } from '../MapTypeSelector';

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

vi.mock('../MapTypeSelector', () => ({
  MapTypeSelector: ({
    currentType,
    onTypeChange,
  }: {
    currentType: MapType;
    onTypeChange: (type: MapType) => void;
  }) => (
    <select
      data-testid='map-type-selector'
      value={currentType}
      onChange={(e) => onTypeChange(e.target.value as MapType)}
    >
      <option value='streets'>Rues</option>
      <option value='satellite'>Satellite</option>
      <option value='terrain'>Terrain</option>
    </select>
  ),
}));

describe('MapSection Component', () => {
  const markers = [
    {
      position: [48.8566, 2.3522] as [number, number],
      title: 'Paris',
      description: 'La ville lumière',
    },
    {
      position: [45.764, 4.8357] as [number, number],
      title: 'Lyon',
      description: 'La capitale de la gastronomie',
    },
  ];

  it('renders the title correctly', () => {
    render(<MapSection markers={markers} />);
    expect(screen.getByText('Carte des Souvenirs')).toBeInTheDocument();
  });

  it('renders the Map component with markers', () => {
    render(<MapSection markers={markers} />);
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Lyon')).toBeInTheDocument();
  });

  it('renders the MapTypeSelector with default streets style', () => {
    render(<MapSection markers={markers} />);
    const selector = screen.getByTestId('map-type-selector');
    expect(selector).toBeInTheDocument();
    expect(selector).toHaveValue('streets');
  });

  it('updates map style when selector changes', () => {
    render(<MapSection markers={markers} />);
    const selector = screen.getByTestId('map-type-selector');
    const map = screen.getByTestId('map');

    // Initial state
    expect(map.getAttribute('data-map-style')).toBe('streets');

    // Change to satellite
    fireEvent.change(selector, { target: { value: 'satellite' } });
    expect(map.getAttribute('data-map-style')).toBe('satellite');

    // Change to terrain
    fireEvent.change(selector, { target: { value: 'terrain' } });
    expect(map.getAttribute('data-map-style')).toBe('terrain');
  });

  it('respects initialMapStyle prop', () => {
    render(<MapSection markers={markers} initialMapStyle='satellite' />);
    const selector = screen.getByTestId('map-type-selector');
    const map = screen.getByTestId('map');

    expect(selector).toHaveValue('satellite');
    expect(map.getAttribute('data-map-style')).toBe('satellite');
  });
});
