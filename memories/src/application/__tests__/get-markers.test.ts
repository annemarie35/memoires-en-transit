import { describe, it, expect } from 'vitest';
import { getMarkersGrouped, getCitiesFromMarkers } from '../get-markers';
import type { Marker } from '../get-markers';

const marker = (city: string): Marker => ({
  position: [0, 0],
  title: `${city} (1)`,
  city,
  testimonies: [],
});

describe('getCitiesFromMarkers', () => {
  it('returns sorted unique city names', () => {
    const markers = [marker('Paris'), marker('Lyon'), marker('Bordeaux')];
    expect(getCitiesFromMarkers(markers)).toEqual(['Bordeaux', 'Lyon', 'Paris']);
  });

  it('deduplicates cities appearing multiple times', () => {
    const markers = [marker('Paris'), marker('Lyon'), marker('Paris')];
    expect(getCitiesFromMarkers(markers)).toEqual(['Lyon', 'Paris']);
  });

  it('returns an empty array when no markers', () => {
    expect(getCitiesFromMarkers([])).toEqual([]);
  });
});

describe('getMarkersGrouped', () => {
  it('groups testimonies by identical position and counts per city in title', async () => {
    const input = [
      {
        testimonyCity: 'Paris',
        testimony: 'A',
        genre: 'F',
        testimonyDate: '2024-01-01',
        testimonyLocation: [48.8566, 2.3522] as [number, number],
        testimonyTheme: 'emploi,papiers',
      },
      {
        testimonyCity: 'Paris',
        testimony: 'B',
        genre: 'M',
        testimonyDate: '2024-01-02',
        testimonyLocation: [48.8566, 2.3522] as [number, number],
        testimonyTheme: 'injures',
      },
    ];

    const result = await getMarkersGrouped(input);
    expect(result[0].position).toEqual([48.8566, 2.3522]);
    expect(result[0].title).toBe('Paris (2)');
    expect(result[0].testimonies).toHaveLength(2);

    // thèmes mappés
    expect(result[0].testimonies[0].theme).toEqual(['emploi', 'papiers']);
    expect(result[0].testimonies[1].theme).toEqual(['injures']);
  });

  it('skips entries without city or location', async () => {
    const input = [
      {
        testimonyCity: undefined,
        testimony: 'X',
        testimonyLocation: [1, 2] as [number, number],
      },
      {
        testimonyCity: 'Lyon',
        testimony: 'Y',
        testimonyLocation: null,
      },
    ];

    const result = await getMarkersGrouped(input as any);
    expect(result).toHaveLength(0);
  });

  it('falls back to aucun thème fourni as theme when testimonyTheme is missing', async () => {
    const input = [
      {
        testimonyCity: 'Bordeaux',
        testimony: 'Sans thème',
        genre: 'F',
        testimonyDate: '2024-03-03',
        testimonyLocation: [44.8378, -0.5792] as [number, number],
      },
    ];

    const result = await getMarkersGrouped(input as any);
    expect(result).toHaveLength(1);
    expect(result[0].testimonies[0].theme).toEqual(['aucun thème fourni']);
  });
});
