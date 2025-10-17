import { MapSection } from './components/MapSection';
import { useEffect, useState } from 'react';
import type { Marker } from './application/get-markers.ts';
import { getMarkersGrouped } from './application/get-markers.ts';
import { getTestimonies } from './infrastructure/get-testimonies.ts';

const testimonies = await getTestimonies();

function App() {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getMarkersGrouped(testimonies).then((marker) => {
      if (isMounted) {
        setMarkers(marker);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className='max-w-6xl mx-auto p-8' data-testid='app-container'>
      {loading ? (
        <div className='text-center text-gray-500'>Chargement des marqueurs...</div>
      ) : (
        <MapSection markers={markers} />
      )}
    </div>
  );
}

export default App;
