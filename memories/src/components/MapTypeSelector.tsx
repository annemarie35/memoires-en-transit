import React from 'react';

export type MapType = 'streets' | 'satellite' | 'terrain';

interface MapTypeSelectorProps {
  currentType: MapType;
  onTypeChange: (type: MapType) => void;
}

export const MapTypeSelector: React.FC<MapTypeSelectorProps> = ({ currentType, onTypeChange }) => {
  return (
    <div className='absolute top-4 right-4 z-[1000] bg-white rounded-lg shadow-md p-2'>
      <select
        value={currentType}
        onChange={(e) => onTypeChange(e.target.value as MapType)}
        className='px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium text-gray-700'
      >
        <option value='streets'>Rues</option>
        <option value='satellite'>Satellite</option>
        <option value='terrain'>Terrain</option>
      </select>
    </div>
  );
};
