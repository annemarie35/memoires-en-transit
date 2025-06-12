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
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100" data-testid="app-container">
      <div className="max-w-6xl mx-auto p-8">
        <MapSection markers={markers} />
      </div>
    </div>
  );
}

export default App;
