import React from 'react';

const ExternalLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <a
    href={href}
    target='_blank'
    rel='noreferrer'
    className='text-yellow-800 underline underline-offset-2 hover:text-yellow-600 transition-colors'
  >
    {children}
  </a>
);

export const About: React.FC = () => {
  return (
    <div data-testid='about-page' className='max-w-2xl mx-auto px-6 py-12'>
      <h1 className='text-3xl font-bold mb-8'>À propos</h1>

      <div className='space-y-6 text-medium text-gray-800 leading-relaxed'>
        <p>
          Ce projet cartographie des mémoires éparses et multiples autour de l'immigration
          portugaise en France. Qu'ont certains lieux à nous dire ?
        </p>

        <p>
          En 2020, l'association Mémoire Vive a lancé un{' '}
          <ExternalLink href='https://www.memoria-viva.fr/mv2-archives/?p=2399'>
            appel pour une collecte de témoignages sur le racisme anti-portugais en France
          </ExternalLink>
          . Les témoignages présentés ici proviennent de cette récolte.
        </p>
      </div>

      <div className='mt-12'>
        <h2 className='text-sm font-bold uppercase tracking-widest text-gray-400 mb-4'>Sources</h2>
        <ul className='space-y-3'>
          {[
            {
              href: 'https://memoria-viva.fr/',
              label: 'Association Mémoire Vive / Memória Viva',
            },
            {
              href: 'https://refuserlaguerrecoloniale.com/qui-sommes-nous/',
              label: 'Exposition Refuser la guerre coloniale',
            },
            {
              href: 'https://memoria-viva.fr/le-projet-sud-express/',
              label: 'Le projet Sud Express',
            },
            {
              href: 'https://ecosexilios-cria.org/fr/',
              label: '#ECOS. Contrecarrer le silence',
            },
          ].map(({ href, label }) => (
            <li key={href} className='flex items-start gap-2'>
              <span className='mt-1.5 h-1.5 w-1.5 rounded-full bg-yellow-600 shrink-0' />
              <ExternalLink href={href}>{label}</ExternalLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
