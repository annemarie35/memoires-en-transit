import React from 'react';
import { Map } from './Map';
import type { Marker } from '../application/get-markers';

interface MapSectionProps {
  markers: Marker[];
  zoom?: number;
}

export const MapSection: React.FC<MapSectionProps> = ({ markers, zoom = 6 }) => {
  return (
    <section className='w-full'>
      <h1 className='text-3xl font-bold mb-4'>Carte des Témoignages</h1>
      <div className='relative'>
        <Map markers={markers} zoom={zoom} mapStyle='streets' />
      </div>
    </section>
  );
};
