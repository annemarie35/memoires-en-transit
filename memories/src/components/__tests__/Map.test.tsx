import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Map } from '../Map';
import type { MapStyle } from '../Map';

vi.mock('react-leaflet', () => ({
  MapContainer: ({
    children,
    scrollWheelZoom,
  }: {
    children: React.ReactNode;
    scrollWheelZoom: boolean;
  }) => (
    <div data-testid='map-container' data-scroll-wheel-zoom={scrollWheelZoom}>
      {children}
    </div>
  ),
  TileLayer: ({ url, attribution }: { url: string; attribution: string }) => (
    <div data-testid='tile-layer' data-url={url} data-attribution={attribution}>
      TileLayer
    </div>
  ),
  Marker: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='map-marker'>{children}</div>
  ),
  Popup: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='map-popup'>{children}</div>
  ),
  Tooltip: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='map-tooltip'>{children}</div>
  ),
  useMap: () => ({
    setView: vi.fn(),
  }),
}));

vi.mock('leaflet', () => ({
  default: {
    icon: () => ({}),
    divIcon: () => ({}),
  },
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
        title: 'Paris (1)',
        testimonies: [{ text: 'City of Light', genre: 'F', date: '2024-01-01' }],
      },
    ];

    render(<Map markers={markers} />);
    expect(screen.getByTestId('map-marker')).toBeInTheDocument();
    expect(screen.getAllByText('Paris (1)').length).toBeGreaterThan(0);
    expect(screen.getByText('City of Light')).toBeInTheDocument();
  });

  it('renders multiple markers', () => {
    const markers = [
      {
        position: [48.8566, 2.3522] as [number, number],
        title: 'Paris (1)',
        testimonies: [{ text: 'City of Light' }],
      },
      {
        position: [45.764, 4.8357] as [number, number],
        title: 'Lyon (1)',
        testimonies: [{ text: 'Gastronomy Capital' }],
      },
    ];

    render(<Map markers={markers} />);
    const markerElements = screen.getAllByTestId('map-marker');
    expect(markerElements).toHaveLength(2);
    expect(screen.getAllByText('Paris (1)').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Lyon (1)').length).toBeGreaterThan(0);
  });

  it('uses default center and zoom when not provided', () => {
    render(<Map />);
    const container = screen.getByTestId('map-container');
    expect(container).toBeInTheDocument();
  });

  describe('Map Styles', () => {
    const mapStyles: { [key in MapStyle]: { url: string } } = {
      streets: {
        url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      },
    };

    it('uses streets style by default', () => {
      render(<Map />);
      const tileLayer = screen.getByTestId('tile-layer');
      expect(tileLayer.getAttribute('data-url')).toBe(mapStyles.streets.url);
    });
  });
});
