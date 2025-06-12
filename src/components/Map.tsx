import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons
const icon = L.icon({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapProps {
  center?: [number, number];
  zoom?: number;
  markers?: Array<{
    position: [number, number];
    title: string;
    description?: string;
  }>;
}

export const Map: React.FC<MapProps> = ({
  center = [48.8566, 2.3522],
  zoom = 13,
  markers = []
}) => {
  return (
    <div style={{ height: '500px', width: '100%' }}>
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map((marker, index) => (
          <Marker 
            key={index} 
            position={marker.position}
            icon={icon}
          >
            <Popup>
              <h3 className="font-bold">{marker.title}</h3>
              {marker.description && <p>{marker.description}</p>}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}; 