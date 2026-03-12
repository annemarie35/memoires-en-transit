import React, { useState, useEffect } from 'react';
import type { Testimony as TestimonyType } from '../application/get-markers';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Testimony } from './Testimony';

const icon = L.divIcon({
  className: '',
  html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 44" width="36" height="44">
    <path d="M18 2C9.7 2 3 8.7 3 17c0 10.4 15 25 15 25S33 27.4 33 17C33 8.7 26.3 2 18 2z" fill="#1e3a5f"/>
    <circle cx="18" cy="17" r="10" fill="white" opacity="0.12"/>
    <text x="10" y="24" font-size="20" fill="white" font-family="Georgia,serif">\u201C</text>
  </svg>`,
  iconSize: [36, 44],
  iconAnchor: [18, 44],
  popupAnchor: [0, -44],
});

export type MapStyle = 'streets';

const mapStyles = {
  streets: {
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
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

const CENTER_MAP_POSITION: [number, number] = [46.5, 2.5];

const MOBILE_BREAKPOINT = 640; // sm

function ResponsiveZoom({ desktopZoom }: { desktopZoom: number }) {
  const map = useMap();

  useEffect(() => {
    const update = () => {
      const zoom = window.innerWidth < MOBILE_BREAKPOINT ? 5 : desktopZoom;
      map.setView(CENTER_MAP_POSITION, zoom);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [map, desktopZoom]);

  return null;
}

export const Map: React.FC<MapProps> = ({
  center = CENTER_MAP_POSITION,
  zoom = 6,
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
    <div className='h-[500px] sm:h-[calc(100vh-20rem)] w-full'>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer url={url} attribution={attribution} />
        <ResponsiveZoom desktopZoom={zoom} />

        {markers.map((marker, index) => {
          const testimonies = marker.testimonies || [];
          const currentIdx = popupIndexes[index] || 0;
          return (
            <Marker key={index} position={[marker.position[0], marker.position[1]]} icon={icon}>
              <Tooltip direction='top' offset={[0, -44]} opacity={1}>
                {marker.title}
              </Tooltip>
              <Popup minWidth={Math.min(384, window.innerWidth - 56)}>
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
