import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Map } from '../Map';

// Mock leaflet because it requires browser environment
vi.mock('leaflet', () => ({
  default: {
    Icon: {
      Default: {
        prototype: {},
        mergeOptions: vi.fn()
      }
    }
  }
}));

// Mock react-leaflet components
vi.mock('react-leaflet', () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="map-container">{children}</div>
  ),
  TileLayer: () => <div data-testid="tile-layer" />,
  Marker: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="marker">{children}</div>
  ),
  Popup: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="popup">{children}</div>
  ),
}));

describe('Map', () => {
  it('renders map container', () => {
    render(<Map />);
    expect(screen.getByTestId('map-container')).toBeInTheDocument();
  });

  it('renders markers with popups', () => {
    const markers = [
      {
        position: [48.8566, 2.3522],
        title: 'Paris',
        description: 'City of Light'
      }
    ];

    render(<Map markers={markers} />);
    expect(screen.getByTestId('marker')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('City of Light')).toBeInTheDocument();
  });
}); 