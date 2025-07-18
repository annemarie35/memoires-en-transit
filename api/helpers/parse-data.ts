import fetch from 'node-fetch';
import testimonies from '../data/temoignages-clean.json';

export const keyMap: Record<string, string> = {
  'Carimbo de data/hora': 'date',
  'Vous êtes ?': 'genre',
  'Où êtes vous né.e ?': 'birthPlace',
  'Quelle est votre date de naissance ?': 'birthDate',
  'Qui est concerné par votre témoignage ?': 'testimonyConcern',
  "Si vous témoignez pour quelqu'un d'autre, de qui s'agit-il ? ": 'testifyingFor',
  "Dans quelle ville se situe votre témoignage ?": 'testimonyCity',
  'Pouvez-vous préciser le département ?': 'testimonyDepartment',
  "Si vous témoignez pour quelqu'un d'autre, où est née cette personne ?": 'testifyingForBithPlace',
  "Quand s'est passé ce que vous racontez ?": 'testimonyDate',
  "Est-ce que votre témoignagne porte sur ": 'testimonyTheme',
  "Votre témoignage": 'testimony',
};

export function renameKeysAuto<T extends Record<string, string>>(
  data: T[],
  mapping: Record<string, string>
): Record<string, string>[] {
  //TODO Refacto
  return data.map(obj => {
    const newObj: Record<string, string> = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const newKey = mapping[key] || key;
        newObj[newKey] = obj[key];
      }
    }
    return newObj;
  });
}

// TODO Move to another folder looks like a port
export async function getPositionFromCity(city: string): Promise<Location|null> {
  const url = `http://localhost:3000/locations?q=${encodeURIComponent(city)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Erreur lors de l'appel à /locations : ${response.status}`);
  }
  const data = await response.json();
  // TODO Enlever les éléments redondants avec l'appel api fait par le serveur

  if (data && data.length > 0) {
    const lat = parseFloat(data[0].lat);
    const lon = parseFloat(data[0].lon);
    return [lat, lon];
  }
  return null;
}

export async function enrichTestimoniesWithLocation<
  T extends { testimonyCity?: string }
>(
  testimonies: T[],
  getPositionFromCity: GetPositionFromCity
): Promise<(T & { testimonyLocation: Location | null })[]> {

  const enriched = await Promise.all(
    testimonies.map(async (t) => {
      const location = t.testimonyCity
        ? await getPositionFromCity(t.testimonyCity)
        : null;
      return { ...t, testimonyLocation: location };
    })
  );
  return enriched;
}

type Location = [latitude, longitude];
type latitude = number
type longitude = number
type GetPositionFromCity = (city: string) => Promise<Location | null>;

