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
    <div className='custom-popup-content'>
      <h3 className='font-bold text-2xl mb-2'>{marker.title}</h3>
      Le témoignage porte sur les thèmes suivants :
      <ul className='list-disc'>
        {testimony.theme && testimony.theme.map((theme, index) => <li key={index}>{theme}</li>)}
      </ul>
      <hr />
      <div className='flex flex-row items-center gap-4 w-[90vw] h-[40vh] min-w-[225px] min-h-[225px] md:w-[25vw] md:h-[25vh] overflow-auto'>
        {testimonies.length > 1 && (
          <button aria-label='Précédent' onClick={onPrev} className='mr-2'>
            <ArrowLeftIcon className='h-6 w-6 text-gray-700' />
          </button>
        )}
        <div className='bg-amber-300 h-[500px] w-[500px]'>
          <div className='text-gray-800 whitespace-pre-line text-lg mb-2'>{testimony.text}</div>
          <div className='text-base text-gray-500 mt-1 mb-2 '>
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
  );
};
