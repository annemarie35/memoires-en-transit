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
    <div className='min-h-screen m-4' data-testid='app-container'>
      <div className='m-2'>
        <header className='header'>
          <h1 className='text-6xl'>{'MEMOIRE(S) EN TRANSIT'}</h1>
          <h2 className='text-4xl'>{'Filiation, exil, identité(s)'}</h2>
        </header>
        <div className='max-w-6xl mx-auto p-8'>
          {loading ? (
            <div className='text-center text-gray-500'>Chargement des marqueurs...</div>
          ) : (
            <MapSection markers={markers} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
