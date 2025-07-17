import React, { useState } from 'react';
import type { Testimony } from '../application/get-markers';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const icon = L.icon({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export type MapStyle = 'streets' | 'satellite' | 'terrain';

const mapStyles = {
  streets: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution:
      'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  },
  terrain: {
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution:
      'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>',
  },
};

interface MapProps {
  center?: [number, number];
  zoom?: number;
  markers?: Array<{
    position: [number, number];
    title: string;
    testimonies: Testimony[];
  }>;
  mapStyle?: MapStyle;
}

export const Map: React.FC<MapProps> = ({
  center = [48.8566, 2.3522],
  zoom = 13,
  markers = [],
  mapStyle = 'streets',
}) => {
  const { url, attribution } = mapStyles[mapStyle];

  // Pour chaque popup, on garde l'index du témoignage affiché
  const [popupIndexes, setPopupIndexes] = useState<{ [key: number]: number }>({});

  const handlePrev = (markerIdx: number, testimoniesLength: number) => {
    setPopupIndexes((prev) => ({
      ...prev,
      [markerIdx]: prev[markerIdx] > 0 ? prev[markerIdx] - 1 : testimoniesLength - 1,
    }));
  };

  const handleNext = (markerIdx: number, testimoniesLength: number) => {
    setPopupIndexes((prev) => ({
      ...prev,
      [markerIdx]: prev[markerIdx] < testimoniesLength - 1 ? prev[markerIdx] + 1 : 0,
    }));
  };

  return (
    <div style={{ height: '1000px', width: '100%' }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer url={url} attribution={attribution} />
        {markers.map((marker, index) => {
          const testimonies = marker.testimonies || [];
          const currentIdx = popupIndexes[index] || 0;
          const testimony = testimonies[currentIdx];
          return (
            <Marker key={index} position={marker.position} icon={icon}>
              <Popup>
                <div className="custom-popup-content">
                  <h3 className='font-bold'>{marker.title}</h3>
                  <div className='flex items-center'>
                    {testimonies.length > 1 && (
                      <button
                        aria-label='Précédent'
                        onClick={() => handlePrev(index, testimonies.length)}
                        style={{ marginRight: 8 }}
                      >
                        ◀️
                      </button>
                    )}
                    <div style={{ flex: 1 }}>
                      <div className='text-gray-800 whitespace-pre-line text-lg mb-2'>
                        {testimony.text}
                      </div>
                      <div className='text-base text-gray-500 mt-1 mb-2'>
                        {testimony.genre && <span>{testimony.genre}</span>}
                        {testimony.genre && testimony.date && ' · '}
                        {testimony.date && <span>{testimony.date}</span>}
                      </div>
                      {testimonies.length > 1 && (
                        <div className='text-base text-gray-500 mt-2 text-center'>
                          Témoignage {currentIdx + 1} / {testimonies.length}
                        </div>
                      )}
                    </div>
                    {testimonies.length > 1 && (
                      <button
                        aria-label='Suivant'
                        onClick={() => handleNext(index, testimonies.length)}
                        style={{ marginLeft: 8 }}
                      >
                        ▶️
                      </button>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};
