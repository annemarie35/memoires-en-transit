import { describe, expect, it } from 'vitest';
import { getThemeFilters, splitThemes } from '../themes';

const PREJUDICES = 'les préjugés, les clichés ou stéréotypes sur les portugais';
const BUILDING =
  "une orientation forcée dans le secteur du bâtiment, proposition d'emploi dans pole emploi dans un secteur professionel caractéristique des portugais";

describe('splitThemes', () => {
  it('returns an empty list for empty values', () => {
    expect(splitThemes('')).toEqual([]);
    expect(splitThemes(undefined)).toEqual([]);
    expect(splitThemes(null)).toEqual([]);
  });

  it('keeps predefined themes containing commas in one piece', () => {
    expect(splitThemes(`${PREJUDICES}, ${BUILDING}, l'accent`)).toEqual([
      PREJUDICES,
      BUILDING,
      "l'accent",
    ]);
  });

  it('splits free-text themes on commas and trims them', () => {
    expect(
      splitThemes('les remarques dégradantes ou injures raciales, Problème de voisinage ')
    ).toEqual(['les remarques dégradantes ou injures raciales', 'Problème de voisinage']);
  });
});

describe('getThemeFilters', () => {
  it('lists predefined themes present in the data, most frequent first', () => {
    const filters = getThemeFilters([
      PREJUDICES,
      `${PREJUDICES}, l'accent`,
      "l'accent, Scolarité",
      `${PREJUDICES}, les papiers d’identité`,
    ]);
    expect(filters.map((f) => [f.shortLabel, f.count])).toEqual([
      ['préjugés et clichés', 3],
      ["l'accent", 2],
      ['papiers d’identité', 1],
    ]);
  });
});
