// Predefined themes from the collection form. Some contain commas, so a raw
// testimonyTheme string can't simply be split on ','.
export const PREDEFINED_THEMES: Array<{ value: string; shortLabel: string }> = [
  {
    value: 'les préjugés, les clichés ou stéréotypes sur les portugais',
    shortLabel: 'préjugés et clichés',
  },
  {
    value: 'les remarques dégradantes ou injures raciales',
    shortLabel: 'remarques dégradantes et injures',
  },
  {
    value:
      "une orientation forcée dans le secteur du bâtiment, proposition d'emploi dans pole emploi dans un secteur professionel caractéristique des portugais",
    shortLabel: 'orientation forcée vers le bâtiment',
  },
  { value: 'les papiers d’identité', shortLabel: 'papiers d’identité' },
  { value: "l'accent", shortLabel: "l'accent" },
];

export function splitThemes(raw?: string | null): string[] {
  if (!raw) return [];
  let rest = raw;
  const found: string[] = [];
  for (const { value } of PREDEFINED_THEMES) {
    if (value.includes(',') && rest.includes(value)) {
      found.push(value);
      rest = rest.replace(value, '');
    }
  }
  const others = rest
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
  return [...found, ...others];
}

export function getThemeFilters(
  rawThemes: Array<string | null | undefined>
): Array<{ value: string; shortLabel: string; count: number }> {
  const counts = new Map<string, number>();
  for (const raw of rawThemes) {
    for (const theme of splitThemes(raw)) {
      counts.set(theme, (counts.get(theme) ?? 0) + 1);
    }
  }
  return PREDEFINED_THEMES.filter(({ value }) => counts.has(value))
    .map((theme) => ({ ...theme, count: counts.get(theme.value) ?? 0 }))
    .sort((a, b) => b.count - a.count);
}
