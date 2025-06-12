import React from 'react';
import { Map } from './Map';
import type { MapStyle } from './Map';

interface MapSectionProps {
  markers: Array<{
    position: [number, number];
    title: string;
    description?: string;
  }>;
  zoom?: number;
  mapStyle?: MapStyle;
}

export const MapSection: React.FC<MapSectionProps> = ({ 
  markers,
  zoom = 6,
  mapStyle = 'streets'
}) => {
  return (
    <section className="w-full">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Carte des Souvenirs</h1>
      <Map markers={markers} zoom={zoom} mapStyle={mapStyle} />
    </section>
  );
}; 