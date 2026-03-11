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

export const Testimony: React.FC<TestimonyProps> = ({
  marker,
  currentIdx,
  testimonies,
  onPrev,
  onNext,
}) => {
  const testimony = testimonies[currentIdx];

  return (
    <div className='w-96 overflow-hidden'>
      <div className='bg-yellow-600 text-white px-4 py-3 flex justify-between items-start'>
        <h3 className='font-bold text-[1.05rem]'>{marker.title}</h3>
        {testimonies.length > 1 && (
          <span className='text-[0.78rem] text-white/70 mt-0.5 ml-2 shrink-0'>
            {currentIdx + 1} / {testimonies.length}
          </span>
        )}
      </div>

      <div className='bg-white px-4 py-3 max-h-72 overflow-y-auto'>
        <div className='text-[0.82rem] text-neutral-900 whitespace-pre-line leading-relaxed mb-3'>
          {testimony.text}
        </div>

        {(testimony.genre || testimony.date) && (
          <div className='flex justify-between items-center pt-2 border-t border-neutral-200 text-[0.75rem]'>
            {testimony.genre && <span className='text-neutral-500'>Qui ? {testimony.genre}</span>}
            {testimony.date && (
              <span className='font-semibold text-neutral-900'>Quand ? {testimony.date}</span>
            )}
          </div>
        )}

        {/*{testimony.theme && testimony.theme.length > 0 && (*/}
        {/*  <div className='mb-3'>*/}
        {/*    <div className='text-[0.68rem] font-bold uppercase tracking-widest text-neutral-600 mb-2'>*/}
        {/*      Thèmes XXX*/}
        {/*    </div>*/}
        {/*    <div className='flex flex-wrap gap-1'>*/}
        {/*      {testimony.theme.map((t, i) => (*/}
        {/*        <span*/}
        {/*          key={i}*/}
        {/*          className='text-[0.68rem] px-2 py-0.5 rounded-full font-medium bg-yellow-100 text-neutral-500'*/}
        {/*        >*/}
        {/*          {t}*/}
        {/*        </span>*/}
        {/*      ))}*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*)}*/}
      </div>

      {testimonies.length > 1 && (
        <div className='bg-neutral-100 border-t border-neutral-200 flex justify-between items-center px-3 py-2'>
          <button
            aria-label='Précédent'
            onClick={onPrev}
            className='p-1 rounded hover:bg-neutral-200 transition-colors'
          >
            <ArrowLeftIcon className='h-4 w-4 text-neutral-500' />
          </button>
          <span className='text-[0.72rem] text-neutral-500'>
            Témoignage {currentIdx + 1} / {testimonies.length}
          </span>
          <button
            aria-label='Suivant'
            onClick={onNext}
            className='p-1 rounded hover:bg-neutral-200 transition-colors'
          >
            <ArrowRightIcon className='h-4 w-4 text-neutral-500' />
          </button>
        </div>
      )}
    </div>
  );
};
