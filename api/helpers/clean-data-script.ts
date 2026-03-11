import path from "path";
import fs from "fs/promises";
import {enrichTestimoniesWithLocation, getPositionFromCity, keyMap, parseBirthDate, renameKeysAuto} from "./parse-data";

async function safeGetPositionFromCity(city: string) {
  try {
    return await getPositionFromCity(city);
  } catch (err) {
    console.error(`Erreur pour la ville "${city}":`, err);
    return null;
  }
}

const RAW_TESTIMONIES_FILE_PATH = path.join(__dirname, '../data/temoignages.json');
const CLEAN_TESTIMONIES_FILE_PATH = path.join(__dirname, '../data/temoignages-clean.json');
const ENRICHED_TESTIMONIES_FILE_PATH = path.join(__dirname, '../data/temoignages-enriched.json');


export const toto = async () => {
  const raw = await fs.readFile(RAW_TESTIMONIES_FILE_PATH, 'utf-8');
  const rawTestimonies = JSON.parse(raw);

  const withCleanKeysTestimonies =  renameKeysAuto(rawTestimonies, keyMap);

  await fs.writeFile(CLEAN_TESTIMONIES_FILE_PATH, JSON.stringify(withCleanKeysTestimonies, null, 2), 'utf-8');
  console.log(`Fichier nettoyé écrit dans ${CLEAN_TESTIMONIES_FILE_PATH}`);

  const enrichedWithLocationCoordinates = await enrichTestimoniesWithLocation(withCleanKeysTestimonies, safeGetPositionFromCity);

  const enrichedWithParsedBirthDate = parseBirthDate(enrichedWithLocationCoordinates)

  await fs.writeFile(ENRICHED_TESTIMONIES_FILE_PATH, JSON.stringify(enrichedWithParsedBirthDate, null, 2), 'utf-8');
  console.log(`Fichier enrichi écrit dans ${ENRICHED_TESTIMONIES_FILE_PATH}`);
  return enrichedWithParsedBirthDate
}

toto()