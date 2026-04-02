import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className='w-full bg-white border-t border-gray-200 mt-auto'>
      <div className='max-w-7xl mx-auto px-4 py-4 text-center text-sm text-gray-500'>
        © {new Date().getFullYear()} Mémoire(s) en transit —{' '}
        <a
          href='https://github.com/annemarie35/memoires-en-transit'
          target='_blank'
          rel='noopener noreferrer'
          className='underline hover:text-gray-700'
        >
          Code source
        </a>
      </div>
    </footer>
  );
};
