import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Map } from '../Map';
import type { MapStyle } from '../Map';

vi.mock('react-leaflet', () => ({
  MapContainer: ({ children, scrollWheelZoom }: { children: React.ReactNode, scrollWheelZoom: boolean }) => (
    <div data-testid="map-container" data-scroll-wheel-zoom={scrollWheelZoom}>{children}</div>
  ),
  TileLayer: ({ url, attribution }: { url: string, attribution: string }) => (
    <div data-testid="tile-layer" data-url={url} data-attribution={attribution}>TileLayer</div>
  ),
  Marker: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="map-marker">{children}</div>
  ),
  Popup: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="map-popup">{children}</div>
  ),
}));

vi.mock('leaflet', () => ({
  default: {
    icon: () => ({})
  }
}));

describe('Map Component', () => {
  it('renders map container with scroll wheel zoom enabled', () => {
    render(<Map />);
    const container = screen.getByTestId('map-container');
    expect(container).toBeInTheDocument();
    expect(container.getAttribute('data-scroll-wheel-zoom')).toBe('true');
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

  describe('Map Styles', () => {
    const mapStyles: { [key in MapStyle]: { url: string } } = {
      streets: {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      },
      satellite: {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      },
      terrain: {
        url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
      }
    };

    it('uses streets style by default', () => {
      render(<Map />);
      const tileLayer = screen.getByTestId('tile-layer');
      expect(tileLayer.getAttribute('data-url')).toBe(mapStyles.streets.url);
    });

    it.each(['streets', 'satellite', 'terrain'] as MapStyle[])(
      'renders correct tile layer for %s style',
      (style) => {
        render(<Map mapStyle={style} />);
        const tileLayer = screen.getByTestId('tile-layer');
        expect(tileLayer.getAttribute('data-url')).toBe(mapStyles[style].url);
      }
    );
  });
}); 