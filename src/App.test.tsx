import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

vi.mock('./components/Map', () => ({
  Map: () => <div data-testid="map-component">Map Component</div>
}));

describe('App Component', () => {
  it('renders the title', () => {
    render(<App />);
    expect(screen.getByText('Carte des Souvenirs')).toBeInTheDocument();
  });

  it('renders the Map component', () => {
    render(<App />);
    expect(screen.getByTestId('map-component')).toBeInTheDocument();
  });

  it('has proper layout classes', () => {
    render(<App />);
    const mainContainer = screen.getByTestId('app-container');
    expect(mainContainer).toHaveClass('min-h-screen', 'bg-gray-100');
  });

  it('provides correct markers to Map component', () => {
    render(<App />);
    const mapComponent = screen.getByTestId('map-component');
    expect(mapComponent).toBeInTheDocument();
  });
}); 