import React, { useState } from 'react';
import type { Testimony as TestimonyType } from '../application/get-markers';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Testimony } from './Testimony';

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
    testimonies: TestimonyType[];
  }>;
  mapStyle?: MapStyle;
}

const CENTER_MAP_POSITION: [number, number] = [48.8566, 2.3522];

export const Map: React.FC<MapProps> = ({
  center = CENTER_MAP_POSITION,
  zoom = 13,
  markers = [],
  mapStyle = 'streets',
}) => {
  const { url, attribution } = mapStyles[mapStyle];

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
    <div className='h-[1280px] w-full bg-green-300'>
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
          return (
            <Marker key={index} position={[marker.position[0], marker.position[1]]} icon={icon}>
              <Popup>
                <Testimony
                  marker={marker}
                  currentIdx={currentIdx}
                  testimonies={testimonies}
                  onPrev={() => handlePrev(index, testimonies.length)}
                  onNext={() => handleNext(index, testimonies.length)}
                />
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};
