import React, { useState } from 'react';
import { Map } from './Map';
import { MapTypeSelector } from './MapTypeSelector';
import type { MapType } from './MapTypeSelector';

interface MapSectionProps {
  markers: Array<{
    position: [number, number];
    title: string;
    description?: string;
  }>;
  zoom?: number;
  initialMapStyle?: MapType;
}

export const MapSection: React.FC<MapSectionProps> = ({
  markers,
  zoom = 6,
  initialMapStyle = 'streets',
}) => {
  const [mapStyle, setMapStyle] = useState<MapType>(initialMapStyle);

  return (
    <section className='w-full'>
      <h1 className='text-ml font-bold mb-6 text-gray-800'>Carte des Souvenirs</h1>
      <div className='relative'>
        <MapTypeSelector currentType={mapStyle} onTypeChange={setMapStyle} />
        <Map markers={markers} zoom={zoom} mapStyle={mapStyle} />
      </div>
    </section>
  );
};
