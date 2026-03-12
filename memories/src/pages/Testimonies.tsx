import React, { useEffect, useState } from 'react';
import { getTestimonies } from '../infrastructure/get-testimonies';
import type { Testimony } from '../infrastructure/get-testimonies';
import { Link } from 'react-router-dom';

const PAGE_SIZE_DEFAULT = 10;

export const Testimonies: React.FC = () => {
  const [items, setItems] = useState<Testimony[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number | 'all'>(PAGE_SIZE_DEFAULT);

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

  const visibleItems = pageSize === 'all' ? items : items.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = pageSize === 'all' ? 1 : Math.ceil(items.length / pageSize);

  function handlePageSizeChange(value: string) {
    setPageSize(value === 'all' ? 'all' : Number(value));
    setPage(1);
  }

  return (
    <div data-testid='testimonies-page' className='max-w-6xl mx-auto p-4 sm:p-8'>
      <div className='flex flex-wrap gap-2 mb-4 items-center justify-between'>
        <h1 className='text-2xl sm:text-3xl font-bold'>Témoignages</h1>
        <Link
          to='/contribuez'
          className='text-base sm:text-xl font-bold text-black rounded hover:bg-yellow-500 transition-colors bg-amber-300 p-2 shrink-0'
        >
          Contribuez !
        </Link>
      </div>
      {loading && <div data-testid='loading'>Chargement…</div>}
      {error && (
        <div data-testid='error' className='text-red-600'>
          {error}
        </div>
      )}
      {!loading && !error && (
        <>
          <div className='flex items-center justify-between mb-4'>
            <div data-testid='count' className='text-sm text-gray-500'>
              {items.length} témoignage(s)
            </div>
            <div className='flex items-center gap-2 text-sm text-gray-600'>
              <label htmlFor='page-size'>Afficher par page :</label>
              <select
                id='page-size'
                value={pageSize}
                onChange={(e) => handlePageSizeChange(e.target.value)}
                className='border border-gray-300 rounded px-2 py-1 bg-white'
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value='all'>Tous</option>
              </select>
            </div>
          </div>

          <ul data-testid='list' className='space-y-4'>
            {visibleItems.map((item, idx) => (
              <li key={idx} className='bg-white rounded shadow p-4'>
                <div className='text-m font-bold text-gray-600 mb-1'>
                  <span>{item.testimonyCity || 'Ville inconnue'}</span>
                  {' · '}
                  <span>{item.testimonyDate || item.date || 'Date inconnue'}</span>
                </div>
                <div className='text-gray-800 whitespace-pre-line mb-3'>{item.testimony}</div>
                <div className='text-sm text-yellow-900 mb-1'>
                  Témoignage soumis le : {item.date}{' '}
                </div>
                <div className='text-sm text-yellow-900 mb-1'>
                  Département : {item.testimonyDepartment || 'Département inconnu'}{' '}
                </div>
                <div className='text-sm text-yellow-900 mb-1'>
                  Qui témoigne ? : {item.genre || 'Genre inconnu'}{' '}
                </div>
                <div className='text-sm text-yellow-900 mb-1'>
                  Date de naissance ? : {item.birthDate || 'Donnée non renseignée'}{' '}
                </div>
                <div className='text-sm text-yellow-900 mb-1'>
                  Lieu de naissance ? : {item.birthPlace || 'Donnée non renseignée'}{' '}
                </div>
                <div className='text-sm text-yellow-900 mb-1'>
                  Témoignage pour qui ? : {item.testifyingFor || 'Donnée non renseignée'}{' '}
                </div>
                <div className='text-sm text-yellow-900 mb-1'>
                  Qui est concerné ? : {item.testimonyConcern || 'Donnée non renseignée'}{' '}
                </div>
                <div className='text-sm text-gray-600 py-1'>
                  {item.testimonyTheme ? (
                    <div className='flex flex-wrap gap-1 mt-1'>
                      {item.testimonyTheme.split(',').map((theme, i) => (
                        <span
                          key={i}
                          className='bg-yellow-100 text-gray-700 px-2 py-0.5 rounded-full italic'
                        >
                          {theme.trim()}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className='italic'>Thème inconnu</span>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {pageSize !== 'all' && totalPages > 1 && (
            <div className='flex items-center justify-center gap-2 mt-8 flex-wrap'>
              <button
                onClick={() => setPage(1)}
                disabled={page === 1}
                className='px-2 py-1 rounded border border-gray-300 text-sm disabled:opacity-40 hover:bg-gray-100'
              >
                «
              </button>
              <button
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 1}
                className='px-3 py-1 rounded border border-gray-300 text-sm disabled:opacity-40 hover:bg-gray-100'
              >
                Précédent
              </button>
              {/* Numéros sur desktop, indicateur compact sur mobile */}
              <div className='hidden sm:flex gap-2'>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`px-3 py-1 rounded border text-sm ${
                      p === page
                        ? 'bg-amber-300 border-amber-400 font-semibold'
                        : 'border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <span className='sm:hidden text-sm text-gray-600 px-2'>
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page === totalPages}
                className='px-3 py-1 rounded border border-gray-300 text-sm disabled:opacity-40 hover:bg-gray-100'
              >
                Suivant
              </button>
              <button
                onClick={() => setPage(totalPages)}
                disabled={page === totalPages}
                className='px-2 py-1 rounded border border-gray-300 text-sm disabled:opacity-40 hover:bg-gray-100'
              >
                »
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
