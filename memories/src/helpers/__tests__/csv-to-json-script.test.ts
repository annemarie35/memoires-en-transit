import { describe, it, expect } from 'vitest';
import path from 'path';
import fs from 'fs';
import { parse } from 'csv-parse/sync';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function csvToJson(filePath: string) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    delimiter: ';',
    trim: true,
  });
}

describe('csv-to-json-script', () => {
  it('transforme temoignages.csv en JSON correctement', () => {
    const csvPath = path.resolve(__dirname, 'raw-data-test.csv');
    const json = csvToJson(csvPath);
    expect(Array.isArray(json)).toBe(true);
    expect(json.length).toBeGreaterThan(0);
    expect(json[0]).toHaveProperty('Carimbo de data/hora');
    expect(json[0]).toHaveProperty('Vous êtes ?');
  });
});
