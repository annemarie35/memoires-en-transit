import { getPositionFromCity } from '../infrastructure/geocoding/get-positions.ts';

export type Testimony = {
  text: string;
  genre?: string;
  date?: string;
};

export type Marker = {
  position: [number, number];
  title: string;
  testimonies: Testimony[];
};

export async function getMarkers(
  temoignages: Array<{ testimonyCity?: string; birthPlace?: string; testimony?: string; [key: string]: any }>
): Promise<Marker[]> {
  const markers: Marker[] = [];
  for (const temoignage of temoignages) {
    const city = temoignage.testimonyCity || t.birthPlace;

    if (!city) continue;
    // TODO l'affichage commence avant la fin de la récupération de toutes les positions...
    // On suppose France par défaut, sinon à adapter
    const query = city.includes(',') ? city : `${city}, France`;
    const pos = await getPositionFromCity(query);
    if (pos) {
      markers.push({
        position: pos,
        title: city,
        testimonies: [{
          text: temoignage.testimony || '',
          genre: temoignage.genre,
          date: temoignage.testimonyDate,
        }],
      });
    }
  }
  return markers;
}

export async function getMarkersGrouped(
  temoignages: Array<{ testimonyCity?: string; testimony?: string; [key: string]: any }>
): Promise<Marker[]> {
  const positionMap: Record<string, { position: [number, number]; city: string; testimonies: Testimony[] }> = {};

  for (const temoignage of temoignages) {
    const city = temoignage.testimonyCity
    if (!city) continue;
    const query = city.includes(',') ? city : `${city}, France`;
    const pos = await getPositionFromCity(query);
    if (pos) {
      const key = pos.join(',');
      if (!positionMap[key]) {
        positionMap[key] = { position: pos, city, testimonies: [] };
      }
      positionMap[key].testimonies.push({
        text: temoignage.testimony || '',
        genre: temoignage.genre,
        date: temoignage.testimonyDate,
      });
    }
  }

  return Object.values(positionMap).map(({ position, city, testimonies }) => ({
    position,
    title: `${city} (${testimonies.length})`,
    testimonies,
  }));
} 