import React, { useEffect, useState } from 'react';
import { getTestimonies } from '../infrastructure/get-testimonies';
import type { Testimony } from '../infrastructure/get-testimonies';

export const Testimonies: React.FC = () => {
  const [items, setItems] = useState<Testimony[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getTestimonies()
      .then((data) => {
        if (!isMounted) return;
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        // TODO Log errors properly
        console.error(error);
        if (!isMounted) return;
        setError('Impossible de charger les témoignages');
        setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div data-testid='testimonies-page' className='max-w-5xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-4'>Témoignages</h1>
      {loading && <div data-testid='loading'>Chargement…</div>}
      {error && (
        <div data-testid='error' className='text-red-600'>
          {error}
        </div>
      )}
      {!loading && !error && (
        <>
          <div data-testid='count' className='text-sm text-gray-500 mb-4'>
            {items.length} témoignage(s)
          </div>
          <ul data-testid='list' className='space-y-4'>
            {items.map((item, idx) => (
              <li key={idx} className='bg-white rounded shadow p-4'>
                <div className='text-m font-bold text-gray-600 mb-1'>
                  <span>{item.testimonyCity || 'Ville inconnue'}</span>
                  {' · '}
                  <span>{item.testimonyDate || item.date || 'Date inconnue'}</span>
                  {' · '}
                  <span>{item.genre || 'Genre inconnu'}</span>
                </div>
                <div className='text-gray-800 whitespace-pre-line'>{item.testimony}</div>
                <div className='text-sm text-gray-600 py-1 italic'>
                  Thèmes : {item.testimonyTheme || 'Thème inconnu'}{' '}
                </div>
                <div className='text-sm text-pink-400 mb-1'>
                  Témoignage soumis le : {item.date}{' '}
                </div>
                <div className='text-sm text-pink-400 mb-1'>
                  Département : {item.testimonyDepartment || 'Département inconnu'}{' '}
                </div>
                <div className='text-sm text-pink-400 mb-1'>
                  Qui témoigne ? : {item.genre || 'Genre inconnu'}{' '}
                </div>
                <div className='text-sm text-pink-400 mb-1'>
                  Date de naissance ? : {item.birthDate || 'Donnée non renseignée'}{' '}
                </div>
                <div className='text-sm text-pink-400 mb-1'>
                  Lieu de naissance ? : {item.birthPlace || 'Donnée non renseignée'}{' '}
                </div>
                <div className='text-sm text-pink-400 mb-1'>
                  Témoignage pour qui ? : {item.testifyingFor || 'Donnée non renseignée'}{' '}
                </div>
                <div className='text-sm text-pink-400 mb-1'>
                  Qui est concerné ? : {item.testimonyConcern || 'Donnée non renseignée'}{' '}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
