import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapIcons';

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapProps {
  center?: [number, number];
  zoom?: number;
  markers?: Array<{
    position: [number, number];
    title: string;
    description?: string;
  }>;
  initialMapType?: 'streets' | 'satellite' | 'terrain';
}

const mapTypes = {
  streets: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  },
  terrain: {
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>'
  }
};

export const Map: React.FC<MapProps> = ({
  center = [48.8566, 2.3522],
  zoom = 13,
  markers = [],
  initialMapType = 'streets'
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapType, setMapType] = useState(initialMapType);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapRef.current = L.map(mapContainerRef.current, {
      center: center,
      zoom: zoom,
      layers: [
        L.tileLayer(mapTypes[mapType].url, {
          attribution: mapTypes[mapType].attribution
        })
      ]
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Handle map type changes
  useEffect(() => {
    if (!mapRef.current) return;

    // Remove all tile layers
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        layer.remove();
      }
    });

    // Add new tile layer
    L.tileLayer(mapTypes[mapType].url, {
      attribution: mapTypes[mapType].attribution
    }).addTo(mapRef.current);
  }, [mapType]);

  // Handle markers
  useEffect(() => {
    if (!mapRef.current) return;

    // Remove existing markers
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        layer.remove();
      }
    });

    // Add new markers
    markers.forEach(marker => {
      L.marker(marker.position)
        .bindPopup(`
          <h3 class="font-bold">${marker.title}</h3>
          ${marker.description ? `<p>${marker.description}</p>` : ''}
        `)
        .addTo(mapRef.current!);
    });
  }, [markers]);

  // Update view when center or zoom changes
  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.setView(center, zoom);
  }, [center, zoom]);

  return (
    <div className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-lg bg-white">
      <div className="absolute top-4 right-4 z-[1000] bg-white rounded-lg shadow-md p-2">
        <select 
          value={mapType}
          onChange={(e) => setMapType(e.target.value as 'streets' | 'satellite' | 'terrain')}
          className="px-2 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="streets">Rues</option>
          <option value="satellite">Satellite</option>
          <option value="terrain">Terrain</option>
        </select>
      </div>
      <div ref={mapContainerRef} className="h-full w-full z-0" />
    </div>
  );
}; 