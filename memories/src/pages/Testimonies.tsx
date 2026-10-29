import React, { useEffect, useRef, useState } from 'react';
import { getTestimonies } from '../infrastructure/get-testimonies';
import type { Testimony } from '../infrastructure/get-testimonies';
import { getThemeFilters, splitThemes } from '../application/themes';
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

const PAGE_BUTTON =
  'min-h-11 min-w-11 px-3 rounded-lg border border-gray-300 bg-white text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed enabled:hover:bg-gray-50';

// Pages to show around the current one, with '…' for the gaps
function getPageItems(page: number, total: number): Array<number | '…'> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [1, page - 1, page, page + 1, total]
    .filter((p, i, all) => p >= 1 && p <= total && all.indexOf(p) === i)
    .sort((a, b) => a - b);
  return pages.flatMap((p, i) => (i > 0 && p - pages[i - 1] > 1 ? ['…' as const, p] : [p]));
}

const TestimonyCard: React.FC<{ item: Testimony }> = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = (item.testimony?.length ?? 0) > COLLAPSE_THRESHOLD;
  const details = DETAILS.filter(({ key }) => item[key]);
  const themes = splitThemes(item.testimonyTheme);

  return (
    <li>
      <article className='bg-white rounded-xl shadow-sm p-5 sm:px-8 sm:py-7 flex flex-col gap-4'>
        <header className='flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1'>
          <h2 className='text-lg font-bold text-navy'>{item.testimonyCity || 'Ville inconnue'}</h2>
          <span className='text-sm text-gray-600'>
            {item.testimonyDate || item.date || 'Date inconnue'}
          </span>
        </header>
        <div className='flex gap-3 sm:gap-4'>
          <span
            aria-hidden='true'
            className='font-[Georgia,serif] text-5xl sm:text-6xl leading-[0.9] text-navy/85'
          >
            “
          </span>
          <div className='flex flex-col gap-2 min-w-0'>
            <p
              className={`font-quote text-[17px] sm:text-lg leading-[1.7] text-gray-800 whitespace-pre-line ${
                isLong && !expanded ? 'line-clamp-6' : ''
              }`}
            >
              {item.testimony}
            </p>
            {isLong && (
              <button
                onClick={() => setExpanded((e) => !e)}
                aria-expanded={expanded}
                className='self-start min-h-11 font-semibold text-navy underline underline-offset-[3px] hover:text-navy-dark'
              >
                {expanded ? 'Réduire' : 'Lire la suite'}
              </button>
            )}
          </div>
        </div>
        {themes.length > 0 && (
          <ul aria-label='Thèmes' className='flex flex-wrap gap-1.5'>
            {themes.map((theme) => (
              <li
                key={theme}
                className='px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[13px]'
              >
                {theme}
              </li>
            ))}
          </ul>
        )}
        {details.length > 0 && (
          <dl className='pt-3.5 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm'>
            {details.map(({ key, label }) => (
              <div key={key} className='flex gap-1.5'>
                <dt className='text-gray-500'>{label} :</dt>
                <dd className='text-gray-700'>{item[key]}</dd>
              </div>
            ))}
          </dl>
        )}
      </article>
    </li>
  );
};

export const Testimonies: React.FC = () => {
  const [items, setItems] = useState<Testimony[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number | 'all'>(PAGE_SIZE_DEFAULT);
  const [activeTheme, setActiveTheme] = useState<string | null>(null);
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

  const themeFilters = getThemeFilters(items.map((item) => item.testimonyTheme));
  const filteredItems = activeTheme
    ? items.filter((item) => splitThemes(item.testimonyTheme).includes(activeTheme))
    : items;
  const visibleItems =
    pageSize === 'all'
      ? filteredItems
      : filteredItems.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = pageSize === 'all' ? 1 : Math.ceil(filteredItems.length / pageSize);

  function goToPage(p: number) {
    setPage(p);
    listTopRef.current?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
  }

  function handlePageSizeChange(value: string) {
    setPageSize(value === 'all' ? 'all' : Number(value));
    setPage(1);
  }

  function handleThemeChange(theme: string | null) {
    setActiveTheme(theme);
    setPage(1);
  }

  const filterButton = (pressed: boolean) =>
    `min-h-9 px-3.5 rounded-full border text-sm ${
      pressed
        ? 'border-navy bg-navy text-white font-semibold'
        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
    }`;

  return (
    <div data-testid='testimonies-page' className='bg-gray-100'>
      <div className='max-w-3xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10 pb-16 flex flex-col gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-4'>
          <div className='flex flex-col gap-1.5'>
            <h1 className='text-3xl sm:text-4xl font-bold text-navy'>Témoignages</h1>
            {!loading && !error && (
              <p data-testid='count' className='text-[15px] text-gray-600'>
                {filteredItems.length} témoignage(s)
                {activeTheme ? ' pour ce thème' : ' recueillis par l’association Mémoire Vive'}
              </p>
            )}
          </div>
          <Link
            to='/contribuez'
            className='inline-flex items-center min-h-11 px-4.5 rounded-lg bg-amber-300 hover:bg-amber-400 transition-colors text-gray-900 font-bold'
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
            <div
              ref={listTopRef}
              className='scroll-mt-4 flex flex-wrap items-end justify-between gap-4'
            >
              {themeFilters.length > 0 && (
                <div
                  role='group'
                  aria-labelledby='theme-filter-label'
                  className='flex flex-col gap-2.5'
                >
                  <div
                    id='theme-filter-label'
                    className='text-[13px] font-semibold uppercase tracking-wider text-gray-600'
                  >
                    Filtrer par thème
                  </div>
                  <div className='flex flex-wrap gap-2'>
                    <button
                      aria-pressed={activeTheme === null}
                      onClick={() => handleThemeChange(null)}
                      className={filterButton(activeTheme === null)}
                    >
                      Tous
                    </button>
                    {themeFilters.map(({ value, shortLabel }) => (
                      <button
                        key={value}
                        aria-pressed={activeTheme === value}
                        title={value}
                        onClick={() => handleThemeChange(value)}
                        className={filterButton(activeTheme === value)}
                      >
                        {shortLabel}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className='flex items-center gap-2 text-sm text-gray-600'>
                <label htmlFor='page-size'>Afficher par page :</label>
                <select
                  id='page-size'
                  value={pageSize}
                  onChange={(e) => handlePageSizeChange(e.target.value)}
                  className='border border-gray-300 rounded-lg px-2 py-1.5 bg-white'
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value='all'>Tous</option>
                </select>
              </div>
            </div>

            <ul data-testid='list' className='flex flex-col gap-5'>
              {visibleItems.map((item) => (
                <TestimonyCard key={item.id} item={item} />
              ))}
            </ul>

            {pageSize !== 'all' && totalPages > 1 && (
              <nav
                aria-label='Pagination'
                className='flex flex-wrap items-center justify-center gap-2 pt-2'
              >
                <button
                  aria-label='Première page'
                  onClick={() => goToPage(1)}
                  disabled={page === 1}
                  className={PAGE_BUTTON}
                >
                  «
                </button>
                <button
                  onClick={() => goToPage(page - 1)}
                  disabled={page === 1}
                  className={PAGE_BUTTON}
                >
                  Précédent
                </button>
                {/* Numéros sur desktop, indicateur compact sur mobile */}
                <div className='hidden sm:flex items-center gap-2'>
                  {getPageItems(page, totalPages).map((p, i) =>
                    p === '…' ? (
                      <span key={`gap-${i}`} className='text-gray-500'>
                        …
                      </span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => goToPage(p)}
                        aria-current={p === page ? 'page' : undefined}
                        className={
                          p === page
                            ? 'min-h-11 min-w-11 rounded-lg border border-navy bg-navy text-white font-semibold'
                            : PAGE_BUTTON
                        }
                      >
                        {p}
                      </button>
                    )
                  )}
                </div>
                <span className='sm:hidden text-sm text-gray-600 px-2'>
                  Page {page} / {totalPages}
                </span>
                <button
                  onClick={() => goToPage(page + 1)}
                  disabled={page === totalPages}
                  className={PAGE_BUTTON}
                >
                  Suivant
                </button>
                <button
                  aria-label='Dernière page'
                  onClick={() => goToPage(totalPages)}
                  disabled={page === totalPages}
                  className={PAGE_BUTTON}
                >
                  »
                </button>
              </nav>
            )}
          </>
        )}
      </div>
    </div>
  );
};
