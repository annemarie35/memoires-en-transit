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
    <div className='min-w-[500px]' id='map'>
      <div className='bg-yellow-400 w-auto h-auto'>
        <h3 className='font-bold text-2xl mb-2'>{marker.title}</h3>
        <hr />
        <div className='bg-yellow-200 flex flex-row items-center gap-2 overflow-auto'>
          {testimonies.length > 1 && (
            <button aria-label='Précédent' onClick={onPrev} className='m-2'>
              <ArrowLeftIcon className='h-6 w-6 text-gray-700' />
            </button>
          )}
          <div className='bg-gray-500 max-w-full max-h-full px-8 overflow-y-auto'>
            <p>Le témoignage porte sur les thèmes suivants :</p>
            <ul className='list-disc'>
              {testimony.theme &&
                testimony.theme.map((theme, index) => <li key={index}>{theme}</li>)}
            </ul>
            <p></p>
            <div className='text-gray-800 whitespace-pre-line text-lg mb-2'>{testimony.text}</div>
            <div className='text-base text-blue-100 mt-1 mb-2 '>
              {testimony.genre && <span>{testimony.genre}</span>}
              {testimony.genre && testimony.date && ' · '}
              {testimony.date && <span>{testimony.date}</span>}
            </div>
            {testimonies.length > 1 && (
              <div className='text-base text-gray-500 mt-4 text-center'>
                Témoignage {currentIdx + 1} / {testimonies.length}
              </div>
            )}
          </div>
          {testimonies.length > 1 && (
            <button aria-label='Suivant' onClick={onNext} className='ml-2'>
              <ArrowRightIcon className='h-6 w-6 text-gray-700' />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
