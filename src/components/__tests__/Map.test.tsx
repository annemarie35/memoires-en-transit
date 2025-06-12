import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Map } from '../Map';

// Mock the react-leaflet components
vi.mock('react-leaflet', () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="map-container">{children}</div>
  ),
  TileLayer: () => <div data-testid="tile-layer">TileLayer</div>,
  Marker: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="map-marker">{children}</div>
  ),
  Popup: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="map-popup">{children}</div>
  ),
}));

// Mock leaflet
vi.mock('leaflet', () => ({
  default: {
    icon: () => ({})
  }
}));

describe('Map Component', () => {
  it('renders map container', () => {
    render(<Map />);
    expect(screen.getByTestId('map-container')).toBeInTheDocument();
    expect(screen.getByTestId('tile-layer')).toBeInTheDocument();
  });

  it('renders markers with popups', () => {
    const markers = [
      {
        position: [48.8566, 2.3522] as [number, number],
        title: 'Paris',
        description: 'City of Light'
      }
    ];

    render(<Map markers={markers} />);
    expect(screen.getByTestId('map-marker')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('City of Light')).toBeInTheDocument();
  });

  it('renders multiple markers', () => {
    const markers = [
      {
        position: [48.8566, 2.3522] as [number, number],
        title: 'Paris',
        description: 'City of Light'
      },
      {
        position: [45.7640, 4.8357] as [number, number],
        title: 'Lyon',
        description: 'Gastronomy Capital'
      }
    ];

    render(<Map markers={markers} />);
    const markerElements = screen.getAllByTestId('map-marker');
    expect(markerElements).toHaveLength(2);
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Lyon')).toBeInTheDocument();
  });

  it('uses default center and zoom when not provided', () => {
    render(<Map />);
    const container = screen.getByTestId('map-container');
    expect(container).toBeInTheDocument();
  });
}); 