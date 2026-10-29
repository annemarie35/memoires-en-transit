import React from 'react';
import type { Testimony as TestimonyType } from '../application/get-markers';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

type TestimonyProps = {
  marker: {
    title: string;
    testimonies: TestimonyType[];
  };
  currentIdx: number;
  testimonies: TestimonyType[];
  onPrev: () => void;
  onNext: () => void;
};

const NAV_BUTTON =
  'min-h-9 min-w-9 flex items-center justify-center rounded-lg border border-gray-300 bg-white text-navy hover:bg-gray-50 transition-colors';

export const Testimony: React.FC<TestimonyProps> = ({
  marker,
  currentIdx,
  testimonies,
  onPrev,
  onNext,
}) => {
  const testimony = testimonies[currentIdx];

  return (
    <article className='w-[min(24rem,calc(100vw-3.5rem))] bg-white flex flex-col'>
      <header className='px-5 pt-4 pb-3 pr-10 border-b border-gray-200'>
        <h3 className='text-lg font-bold text-navy'>{marker.title}</h3>
      </header>

      {testimonies.length > 1 && (
        <div className='flex justify-between items-center px-5 py-2.5 border-b border-gray-200'>
          <button aria-label='Précédent' onClick={onPrev} className={NAV_BUTTON}>
            <ArrowLeftIcon className='h-4 w-4' />
          </button>
          <span className='text-sm text-gray-600'>
            Témoignage {currentIdx + 1} / {testimonies.length}
          </span>
          <button aria-label='Suivant' onClick={onNext} className={NAV_BUTTON}>
            <ArrowRightIcon className='h-4 w-4' />
          </button>
        </div>
      )}

      <div className='px-5 py-4 max-h-72 overflow-y-auto flex flex-col gap-4'>
        {testimony.date && <span className='text-sm text-gray-600'>{testimony.date}</span>}
        <div className='flex gap-3'>
          <span
            aria-hidden='true'
            className='font-[Georgia,serif] text-5xl leading-[0.9] text-navy/85'
          >
            “
          </span>
          <p className='font-quote text-[15px] leading-[1.7] text-gray-800 whitespace-pre-line min-w-0'>
            {testimony.text}
          </p>
        </div>

        {testimony.theme && testimony.theme.length > 0 && (
          <ul aria-label='Thèmes' className='flex flex-wrap gap-1.5'>
            {testimony.theme.map((t, i) => (
              <li
                key={i}
                className='px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[13px]'
              >
                {t}
              </li>
            ))}
          </ul>
        )}

        {testimony.genre && (
          <dl className='pt-3 border-t border-gray-200 text-sm'>
            <div className='flex gap-1.5'>
              <dt className='text-gray-500'>Qui témoigne :</dt>
              <dd className='text-gray-700'>{testimony.genre}</dd>
            </div>
          </dl>
        )}
      </div>
    </article>
  );
};
