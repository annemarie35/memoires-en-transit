import { MapSection } from './components/MapSection';
import temoignages from '../data/temoignages.json';
import { keyMap, renameKeysAuto } from './helpers/parse-data.ts';
import { useEffect, useState } from 'react';
import type { Marker } from './application/get-markers.ts';
import { getMarkersGrouped } from './application/get-markers.ts';

const toto = renameKeysAuto(temoignages, keyMap);
const temoignagesClean = toto.slice(0, 10);

function App() {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getMarkersGrouped(temoignagesClean).then((marker) => {
      if (isMounted) {
        setMarkers(marker);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  console.log('markers', markers);

  return (
    <div className='min-h-screen bg-gray-100' data-testid='app-container'>
      <header className='header'>
        <h1>{'MEMOIRE(S) EN TRANSIT'}</h1>
        <h2>{'Filiation, exil, identité(s)'}</h2>
      </header>
      <div className='max-w-6xl mx-auto p-8'>
        {loading ? (
          <div className='text-center text-gray-500'>Chargement des marqueurs...</div>
        ) : (
          <MapSection markers={markers} />
        )}
        {/*<section className='mt-12'>*/}
        {/*  <h2 className='text-xl font-bold mb-4'>Témoignages</h2>*/}
        {/*  <ul className='space-y-6'>*/}
        {/*    {temoignagesClean.map((t, idx) => (*/}
        {/*      <li key={idx} className='bg-white rounded-lg shadow p-4'>*/}
        {/*        <div className='text-sm text-gray-500 mb-1'>*/}
        {/*          <span>{t.testimonyCity || 'Ville inconnue'}</span>*/}
        {/*          {' · '}*/}
        {/*          <span>{t.date || 'Date inconnue'}</span>*/}
        {/*          {' · '}*/}
        {/*          <span>{t.genre || 'Genre inconnu'}</span>*/}
        {/*        </div>*/}
        {/*        <div className='text-gray-800 whitespace-pre-line'>{t.testimony}</div>*/}
        {/*      </li>*/}
        {/*    ))}*/}
        {/*  </ul>*/}
        {/*</section>*/}
      </div>
    </div>
  );
}

export default App;
