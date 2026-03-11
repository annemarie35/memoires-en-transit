import React from 'react';
import { Map } from './Map';
import type { Marker } from '../application/get-markers';

interface MapSectionProps {
  markers: Marker[];
  cities: string[];
  selectedCity: string;
  onCityChange: (city: string) => void;
  zoom?: number;
}

export const MapSection: React.FC<MapSectionProps> = ({
  markers,
  cities,
  selectedCity,
  onCityChange,
  zoom = 6,
}) => {
  return (
    <section className='w-full'>
      <h1 className='text-3xl font-bold mb-4'>Carte des Témoignages</h1>
      <div className='mb-4'>
        <select
          value={selectedCity}
          onChange={(e) => onCityChange(e.target.value)}
          className='border border-gray-300 rounded px-3 py-2 text-sm bg-white'
        >
          <option value=''>Toutes les villes</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <div className='relative'>
        <Map markers={markers} zoom={zoom} mapStyle='streets' />
      </div>
    </section>
  );
};
