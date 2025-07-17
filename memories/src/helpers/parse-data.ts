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
