// @ts-ignore
import fs from 'fs/promises';
// @ts-ignore
import path from 'path';
import { renameKeysAuto, keyMap, enrichTestimoniesWithLocation, getPositionFromCity } from './parse-data';

async function cleanTestimonies() {
  const filePath = path.join(__dirname, '../data/temoignages.json');
  const raw = await fs.readFile(filePath, 'utf-8');
  const testimonies = JSON.parse(raw);
  const cleaned = renameKeysAuto(testimonies, keyMap);
  return cleaned;
}

if (require.main === module) {
  cleanTestimonies().then(async cleaned => {
    const outPath = path.join(__dirname, '../data/temoignages-clean.json');
    await fs.writeFile(outPath, JSON.stringify(cleaned, null, 2), 'utf-8');
    console.log(`Fichier nettoyé écrit dans ${outPath}`);

    const safeGetPositionFromCity = async (city: string) => {
      try {
        return await getPositionFromCity(city);
      } catch (err) {
        console.error(`Erreur pour la ville "${city}":`, err);
        return null;
      }
    };
    const enriched = await enrichTestimoniesWithLocation(cleaned, safeGetPositionFromCity);
    const enrichedPath = path.join(__dirname, '../data/temoignages-enriched.json');
    await fs.writeFile(enrichedPath, JSON.stringify(enriched, null, 2), 'utf-8');
    console.log(`Fichier enrichi écrit dans ${enrichedPath}`);
  }).catch(err => {
    console.error('Erreur nettoyage témoignages:', err);
  });
}

export default cleanTestimonies; 