import fs from 'fs/promises';
import path from 'path';
import { renameKeysAuto, keyMap } from './parse-data';

async function cleanTestimonies() {
  const filePath = path.join(__dirname, '../data/temoignages.json');
  const raw = await fs.readFile(filePath, 'utf-8');
  const testimonies = JSON.parse(raw);
  const cleaned = renameKeysAuto(testimonies, keyMap);
  return cleaned;
}

// Pour exécution directe
if (require.main === module) {
  cleanTestimonies().then(async data => {
    const outPath = path.join(__dirname, '../data/temoignages-clean.json');
    await fs.writeFile(outPath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`Fichier nettoyé écrit dans ${outPath}`);
  }).catch(err => {
    console.error('Erreur nettoyage témoignages:', err);
  });
}

export default cleanTestimonies; 