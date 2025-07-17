import { getPositionFromCity } from '../infrastructure/geocoding/get-positions.ts';

export type Marker = {
  position: [number, number];
  title: string;
  description: string;
};

export async function getMarkers(
  temoignages: Array<{ testimonyCity?: string; birthPlace?: string; testimony?: string; [key: string]: any }>
): Promise<Marker[]> {
  const markers: Marker[] = [];
  for (const t of temoignages) {
    const city = t.testimonyCity || t.birthPlace;

    if (!city) continue;
    // TODO l'affichage commence avant la fin de la récupération de toutes les positions...
    // On suppose France par défaut, sinon à adapter
    const query = city.includes(',') ? city : `${city}, France`;
    const pos = await getPositionFromCity(query);
    if (pos) {
      markers.push({
        position: pos,
        title: city,
        description: t.testimony || '',
      });
    }
  }
  return markers;
} 