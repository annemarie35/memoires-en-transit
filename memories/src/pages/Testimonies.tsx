import React, { useEffect, useRef, useState } from 'react';
import { getTestimonies } from '../infrastructure/get-testimonies';
import type { Testimony } from '../infrastructure/get-testimonies';
import { Link } from 'react-router-dom';

const PAGE_SIZE_DEFAULT = 10;
const COLLAPSE_THRESHOLD = 600;

type DetailKey =
  | 'genre'
  | 'birthDate'
  | 'birthPlace'
  | 'testimonyDepartment'
  | 'testimonyConcern'
  | 'testifyingFor'
  | 'date';

const DETAILS: Array<{ key: DetailKey; label: string }> = [
  { key: 'genre', label: 'Qui témoigne' },
  { key: 'birthDate', label: 'Né·e en' },
  { key: 'birthPlace', label: 'Lieu de naissance' },
  { key: 'testimonyDepartment', label: 'Département' },
  { key: 'testimonyConcern', label: 'Concerné·e' },
  { key: 'testifyingFor', label: 'Pour qui' },
  { key: 'date', label: 'Soumis le' },
];

const TestimonyCard: React.FC<{ item: Testimony }> = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = (item.testimony?.length ?? 0) > COLLAPSE_THRESHOLD;
  const details = DETAILS.filter(({ key }) => item[key]);

  return (
    <li className='bg-white rounded shadow p-4 sm:p-6'>
      <div className='text-m font-bold text-gray-600 mb-2'>
        <span>{item.testimonyCity || 'Ville inconnue'}</span>
        {' · '}
        <span>{item.testimonyDate || item.date || 'Date inconnue'}</span>
      </div>
      <p
        className={`text-gray-800 text-base sm:text-lg leading-relaxed whitespace-pre-line ${
          isLong && !expanded ? 'line-clamp-6' : ''
        }`}
      >
        {item.testimony}
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
          className='mt-2 text-sm font-semibold text-yellow-900 underline underline-offset-2 hover:text-black'
        >
          {expanded ? 'Réduire' : 'Lire la suite'}
        </button>
      )}
      {item.testimonyTheme && (
        <div className='flex flex-wrap gap-1 mt-4 text-sm'>
          {item.testimonyTheme.split(',').map((theme, i) => (
            <span key={i} className='bg-yellow-100 text-gray-700 px-2 py-0.5 rounded-full italic'>
              {theme.trim()}
            </span>
          ))}
        </div>
      )}
      {details.length > 0 && (
        <dl className='mt-4 pt-3 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-gray-500'>
          {details.map(({ key, label }) => (
            <div key={key} className='flex gap-1'>
              <dt>{label} :</dt>
              <dd className='text-gray-700'>{item[key]}</dd>
            </div>
          ))}
        </dl>
      )}
    </li>
  );
};

export const Testimonies: React.FC = () => {
  const [items, setItems] = useState<Testimony[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number | 'all'>(PAGE_SIZE_DEFAULT);
  const listTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
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

  const visibleItems =
    pageSize === 'all' ? items : items.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = pageSize === 'all' ? 1 : Math.ceil(items.length / pageSize);

  function goToPage(p: number) {
    setPage(p);
    listTopRef.current?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
  }

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
          <div ref={listTopRef} className='flex items-center justify-between mb-4 scroll-mt-4'>
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
            {visibleItems.map((item) => (
              <TestimonyCard key={item.id} item={item} />
            ))}
          </ul>

          {pageSize !== 'all' && totalPages > 1 && (
            <div className='flex items-center justify-center gap-2 mt-8 flex-wrap'>
              <button
                onClick={() => goToPage(1)}
                disabled={page === 1}
                className='px-2 py-1 rounded border border-gray-300 text-sm disabled:opacity-40 hover:bg-gray-100'
              >
                «
              </button>
              <button
                onClick={() => goToPage(page - 1)}
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
                    onClick={() => goToPage(p)}
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
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages}
                className='px-3 py-1 rounded border border-gray-300 text-sm disabled:opacity-40 hover:bg-gray-100'
              >
                Suivant
              </button>
              <button
                onClick={() => goToPage(totalPages)}
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
