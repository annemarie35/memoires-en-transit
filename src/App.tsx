import React from 'react';
import { MapSection } from './components/MapSection';

function App() {
  const markers = [
    {
      position: [48.8566, 2.3522] as [number, number],
      title: 'Paris',
      description: 'La ville lumière'
    },
    {
      position: [45.7640, 4.8357] as [number, number],
      title: 'Lyon',
      description: 'La capitale de la gastronomie'
    },
    {
      position: [48.8417, 2.3661] as [number, number],
      title: 'Gare d\'Austerlitz',
      description: 'Gare d\'Austerlitz'
    },
    {
      position: [43.3530587, -1.7818216] as [number, number],
      title: 'Gare de Hendaye',
      description: 'Gare de Hendaye'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100" data-testid="app-container">
          <header className="header">
      <h1>
        {'MEMOIRE(S) EN TRANSIT'}
      </h1>
      <h2>{'Filiation, exil, identité(s)'}</h2>
    </header>
      <div className="max-w-6xl mx-auto p-8">
        <MapSection markers={markers} />
      </div>
    </div>
  );
}

export default App;
