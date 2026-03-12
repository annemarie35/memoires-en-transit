import React from 'react';
import { Map } from './Map';
import type { Marker } from '../application/get-markers';
import { Link } from 'react-router-dom';

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
    <section data-testid='map-section-page' className='w-full'>
      <div className='flex flex-wrap gap-2 mb-4 items-center justify-between'>
        <h1 className='text-2xl sm:text-3xl font-bold'>Carte des Témoignages</h1>
        <Link
          to='/contribuez'
          className='text-base sm:text-xl font-bold text-black rounded hover:bg-yellow-500 transition-colors bg-amber-300 p-2 shrink-0'
        >
          Contribuez !
        </Link>
      </div>
      <div className='flex items-center justify-between mb-4'>
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
