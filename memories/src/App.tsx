import { MapSection } from './components/MapSection';
import { useEffect, useState } from 'react';
import type { Marker } from './application/get-markers.ts';
import { getMarkersGrouped } from './application/get-markers.ts';
import { getTestimonies } from './infrastructure/get-testimonies.ts';
import { ExclamationTriangleIcon, CogIcon } from '@heroicons/react/24/solid';

function App() {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<'testimonies' | 'markers' | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    setErrorType(null);

    (async () => {
      try {
        const data = await getTestimonies();
        try {
          const marker = await getMarkersGrouped(data);
          if (!isMounted) return;
          setMarkers(marker);
          setLoading(false);
        } catch (error) {
          // TODO Log errors properly
          console.error(error);
          if (!isMounted) return;
          setError('Impossible de préparer les marqueurs');
          setErrorType('markers');
          setLoading(false);
        }
      } catch (error) {
        // TODO Log errors properly
        console.error(error);
        if (!isMounted) return;
        setError('Impossible de charger les témoignages');
        setErrorType('testimonies');
        setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const getErrorIcon = () => {
    if (errorType === 'testimonies') {
      return <ExclamationTriangleIcon className='h-5 w-5 text-orange-500' />;
    }
    if (errorType === 'markers') {
      return <CogIcon className='h-5 w-5 text-blue-500' />;
    }
    return null;
  };

  const getErrorColor = () => {
    if (errorType === 'testimonies') return 'text-orange-600';
    if (errorType === 'markers') return 'text-blue-600';
    return 'text-red-600';
  };

  return (
    <div className='max-w-6xl mx-auto p-8' data-testid='app-container'>
      {loading && <div className='text-center text-gray-500'>Chargement des marqueurs...</div>}
      {error && (
        <div
          data-testid='error'
          className={`text-center ${getErrorColor()} flex items-center justify-center gap-2`}
        >
          {getErrorIcon()}
          {error}
        </div>
      )}
      {!loading && !error && <MapSection markers={markers} />}
    </div>
  );
}

export default App;
