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
    <div className='w-72 overflow-hidden'>
      <div className='bg-[#1e3a5f] text-white px-4 py-3 flex justify-between items-start'>
        <h3 className='font-bold text-[1.05rem]'>{marker.title}</h3>
        {testimonies.length > 1 && (
          <span className='text-[0.78rem] text-white/70 mt-0.5 ml-2 shrink-0'>
            {currentIdx + 1} / {testimonies.length}
          </span>
        )}
      </div>

      <div className='bg-white px-4 py-3 max-h-72 overflow-y-auto'>
        {/* Themes — .tab-section-title + .meta-tag.meta-blue */}
        {testimony.theme && testimony.theme.length > 0 && (
          <div className='mb-3'>
            <div className='text-[0.68rem] font-bold uppercase tracking-widest text-[#2563eb] mb-2'>
              Thèmes
            </div>
            <div className='flex flex-wrap gap-1'>
              {testimony.theme.map((t, i) => (
                <span
                  key={i}
                  className='text-[0.68rem] px-2 py-0.5 rounded-full font-medium bg-[#eff6ff] text-[#2563eb]'
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Testimony text */}
        <div className='text-[0.82rem] text-[#111827] whitespace-pre-line leading-relaxed mb-3'>
          {testimony.text}
        </div>

        {/* Genre & date — .data-row */}
        {(testimony.genre || testimony.date) && (
          <div className='flex justify-between items-center pt-2 border-t border-[#e5e7eb] text-[0.75rem]'>
            {testimony.genre && <span className='text-[#6b7280]'>{testimony.genre}</span>}
            {testimony.date && (
              <span className='font-semibold text-[#111827]'>{testimony.date}</span>
            )}
          </div>
        )}
      </div>

      {/* Navigation footer */}
      {testimonies.length > 1 && (
        <div className='bg-[#f9fafb] border-t border-[#e5e7eb] flex justify-between items-center px-3 py-2'>
          <button
            aria-label='Précédent'
            onClick={onPrev}
            className='p-1 rounded hover:bg-[#e5e7eb] transition-colors'
          >
            <ArrowLeftIcon className='h-4 w-4 text-[#6b7280]' />
          </button>
          <span className='text-[0.72rem] text-[#6b7280]'>
            Témoignage {currentIdx + 1} / {testimonies.length}
          </span>
          <button
            aria-label='Suivant'
            onClick={onNext}
            className='p-1 rounded hover:bg-[#e5e7eb] transition-colors'
          >
            <ArrowRightIcon className='h-4 w-4 text-[#6b7280]' />
          </button>
        </div>
      )}
    </div>
  );
};
