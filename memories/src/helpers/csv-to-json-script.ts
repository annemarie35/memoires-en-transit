import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { csvToJson } from './format-data-helpers.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const argPath = process.argv[2];
const csvPath = argPath
  ? path.isAbsolute(argPath)
    ? argPath
    : path.resolve(process.cwd(), argPath)
  : path.resolve(__dirname, '__tests__', 'temoignages.csv');

const jsonPath = csvPath.replace(/\.csv$/i, '.json');

const json = csvToJson(csvPath);

fs.writeFileSync(jsonPath, JSON.stringify(json, null, 2), 'utf-8');
console.log(`JSON written to ${jsonPath}`);
