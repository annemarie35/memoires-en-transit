import React, { useState } from 'react';
import { Map } from './Map';
import { MapTypeSelector } from './MapTypeSelector';
import type { MapType } from './MapTypeSelector';
import type { Marker } from '../application/get-markers';

interface MapSectionProps {
  markers: Marker[];
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
      <h1 className='text-3xl font-bold mb-4'>Carte des Souvenirs</h1>
      <div className='relative'>
        <MapTypeSelector currentType={mapStyle} onTypeChange={setMapStyle} />
        <Map markers={markers} zoom={zoom} mapStyle={mapStyle} />
      </div>
    </section>
  );
};
