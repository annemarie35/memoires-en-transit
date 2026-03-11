import React from 'react';

export const Contribuez: React.FC = () => {
  return (
    <div className='max-w-6xl mx-auto p-8 '>
      <h1 className='text-3xl font-bold mb-8 leading-snug'>
        Appel pour une collecte de témoignages sur le racisme anti-portugais en France
      </h1>
      <p className='text-sm font-bold uppercase tracking-widest text-gray-400 mb-4'>
        Association Mémoire Vive / Memória Viva — 26 juin 2020
      </p>

      <div className='space-y-6 text-gray-800 leading-relaxed'>
        <p>
          Nous avons souvent discuté entre nous du racisme, de la discrimination et de la xénophobie
          dont les immigrés portugais et leurs enfants ont été et sont victimes en France. À mémoire
          vive/memória viva nous l’avons combattu par{' '}
          <b>
            notre travail sur la mémoire de l’immigration portugaise, en documentant les conditions
            d’accueil, de travail et de vie difficile de cette population en France
          </b>
          . Alors que ce racisme nous semble perdurer dans la société française, stigmatisant
          notamment les jeunes d’origines portugaises, parfois installés en France depuis 3 ou 4
          générations, il nous a semblé important de faire une collecte de témoignages sur le sujet.
        </p>

        <p>
          D’abord parce qu’
          <b>
            il n’existe pratiquement aucune étude sur le sujet, ni en histoire, ni en sociologie, ni
            en anthropologie
          </b>
          . D’autre part parce que ce sont des expériences traumatisantes vécues par des centaines
          de milliers d’individus, l’immigration portugaise étant, rappelons-le, une des plus
          nombreuse en France. Enfin parce que, pour des raisons diverses, il semble que ces
          expériences soit passées sous silence par la société d’accueil ou même par les propres
          victimes.
        </p>

        <p>
          Nous insistons sur le fait que cette démarche s’affranchit de toute volonté
          communautariste. Nous avons régulièrement, collectivement et/ou individuellement, pris
          position contre le racisme, la discrimination et la xénophobie qui a frappé et frappe
          encore les autres immigrations en France, parfois avec encore plus de violence. Notamment
          dans cette tribune
          <a
            href={
              'http://www.memoria-viva.fr/bidonville-de-champigny-nous-nous-opposons-a-linstrumentalisation-de-notre-histoire-et-de-nos-memoires/'
            }
          >
            http://www.memoria-viva.fr/bidonville-de-champigny-nous-nous-opposons-a-linstrumentalisation-de-notre-histoire-et-de-nos-memoires/
          </a>
        </p>

        <p>
          <b>
            L’idée de cette collecte est essentiellement de donner de la matière, de créer un corpus
            qui permette aux chercheurs de s’en emparer.
          </b>
        </p>

        <p>
          Le formulaire que nous mettons à disposition permet de raconter des expériences vécues par
          vous-même, par un de vos proches ou dont vous avez été témoin. Les textes seront ensuite
          compilés et, si vous le souhaitez « anonymisés » par nos soins. Pour raconter ce que vous
          avez vécu, point n’est besoin d’être un littéraire. Ce qui compte, c’est la réalité de
          l’expérience vécue, qu’elle soit jugée traumatisante, grave, superficielle ou anecdotique.
        </p>

        <p>
          Nous vous invitons à faire circuler ce formulaire autour de vous, dans vos familles, dans
          vos associations, syndicats, laboratoires de recherche et autres collectifs.
        </p>
      </div>

      <div className='mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded flex flex-col items-center'>
        <p className='font-semibold text-gray-900 mb-4'>Partagez votre témoignage</p>
        <a
          href='https://forms.gle/Nhie7Lvo7Cffv5Pj9'
          target='_blank'
          rel='noreferrer'
          className='inline-block bg-yellow-600 text-white font-bold px-6 py-3 rounded hover:bg-yellow-700 transition-colors'
        >
          Accéder au formulaire
        </a>
      </div>
    </div>
  );
};
