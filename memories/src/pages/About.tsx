export const About: React.FC = () => {
  return (
    <div data-testid='about-page' className='max-w-5xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-4'>À propos</h1>
      <div className='font-normal'>
        <span>
          Le projet de cartographier des mémoires éparses et multiples autour de l'immigration
          portugaise. Qu'ont certains lieux à nous dire ?
        </span>
        Un projet a été lancé par l'association Mémoire Vive en 2020{' '}
        <a
          className='px-3 py-2 rounded hover:bg-gray-100'
          href='https://www.memoria-viva.fr/mv2-archives/?p=2399'
          target='_blank'
        >
          Appel pour une collecte de témoignages sur le racisme anti-portugais en France
        </a>
        <p>Les témoignages utilisés ici proviennent de cette récolte.</p>
        <p className='m-2'>Sources :</p>
        <ul className='list-disc ml-6'>
          <li>
            <a
              className='px-3 py-2 rounded hover:bg-gray-100'
              href='https://memoria-viva.fr/'
              target='_blank'
            >
              Association Mémoire Vive/Memória Viva
            </a>
          </li>
          <li>
            <a
              className='px-3 py-2 rounded hover:bg-gray-100'
              href='https://refuserlaguerrecoloniale.com/qui-sommes-nous/'
              target='_blank'
            >
              Exposition Refuser la guerre coloniale
            </a>
          </li>
          <li>
            <a
              className='px-3 py-2 rounded hover:bg-gray-100'
              href='https://memoria-viva.fr/le-projet-sud-express/'
              target='_blank'
            >
              Le projet Sud Express
            </a>
          </li>
          <li>
            <a
              className='px-3 py-2 rounded hover:bg-gray-100'
              href='https://ecosexilios-cria.org/fr/'
              target='_blank'
            >
              #ECOS. Contrecarrer le silence
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
