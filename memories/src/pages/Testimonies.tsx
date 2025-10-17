import React, { useEffect, useState } from 'react';
import { getTestimonies } from '../infrastructure/get-testimonies';
import type { Testimony } from '../infrastructure/get-testimonies';

export const Testimonies: React.FC = () => {
  const [items, setItems] = useState<Testimony[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getTestimonies()
      .then((data) => {
        if (!mounted) return;
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((e) => {
        if (!mounted) return;
        setError('Impossible de charger les témoignages');
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div data-testid='testimonies-page' className='max-w-5xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-4'>Témoignages</h1>
      {loading && <div data-testid='loading'>Chargement…</div>}
      {error && <div data-testid='error' className='text-red-600'>{error}</div>}
      {!loading && !error && (
        <>
          <div data-testid='count' className='text-sm text-gray-500 mb-4'>
            {items.length} témoignage(s)
          </div>
          <ul data-testid='list' className='space-y-4'>
            {items.map((t, idx) => (
              <li key={idx} className='bg-white rounded shadow p-4'>
                <div className='text-sm text-gray-600 mb-1'>
                  <span>{t.testimonyCity || 'Ville inconnue'}</span>
                  {' · '}
                  <span>{t.testimonyDate || t.date || 'Date inconnue'}</span>
                  {' · '}
                  <span>{t.genre || 'Genre inconnu'}</span>
                </div>
                <div className='text-gray-800 whitespace-pre-line'>
                  {t.testimony}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
