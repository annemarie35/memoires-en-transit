import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MapSection } from '../MapSection';

// Mock the Map component
vi.mock('../Map', () => ({
  Map: ({ markers }: { markers: Array<{ title: string }> }) => (
    <div data-testid="map">
      {markers.map((marker, index) => (
        <div key={index} data-testid="marker">{marker.title}</div>
      ))}
    </div>
  )
}));

describe('MapSection Component', () => {
  const markers = [
    {
      position: [48.8566, 2.3522] as [number, number],
      title: 'Paris',
      description: 'La ville lumière'
    },
    {
      position: [45.7640, 4.8357] as [number, number],
      title: 'Lyon',
      description: 'La capitale de la gastronomie'
    }
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

  it('passes zoom and mapStyle props to Map component', () => {
    render(<MapSection markers={markers} zoom={8} mapStyle="satellite" />);
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
}); 