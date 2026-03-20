export type Testimony = {
  text: string;
  genre?: string;
  date?: string;
  theme?: string[];
};

export type Marker = {
  position: [number, number];
  title: string;
  city: string;
  testimonies: Testimony[];
};

export function getCitiesFromMarkers(markers: Marker[]): string[] {
  return [...new Set(markers.map((m) => m.city))].sort();
}

export async function getMarkersGrouped(
  temoignages: Array<{ testimonyCity?: string; testimony?: string; [key: string]: any }>
): Promise<Marker[]> {
  const positionMap: Record<
    string,
    { position: [number, number]; city: string; testimonies: Testimony[] }
  > = {};

  for (const temoignage of temoignages) {
    const city = temoignage.testimonyCity;
    if (!city) continue;
    const pos = temoignage.testimonyLocation;
    if (pos) {
      const key = pos.join(',');
      if (!positionMap[key]) {
        positionMap[key] = { position: pos, city, testimonies: [] };
      }
      positionMap[key].testimonies.push({
        text: temoignage.testimony || '',
        genre: temoignage.genre,
        date: temoignage.testimonyDate,
        theme: temoignage.testimonyTheme
          ? temoignage.testimonyTheme.split(',')
          : ['aucun thème fourni'],
      });
    }
  }

  return Object.values(positionMap).map(({ position, city, testimonies }) => ({
    position,
    title: `${city} (${testimonies.length})`,
    city,
    testimonies,
  }));
}
