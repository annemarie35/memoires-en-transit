import fs from 'fs';
import { parse } from 'csv-parse/sync';

export function csvToJson(filePath: string) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    delimiter: ';',
    trim: true,
  });
}

export async function getPositionFromCity(cityAndCountry: string): Promise<[number, number] | undefined> {
  const query = encodeURIComponent(cityAndCountry);
  const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`;

  const response = await fetch(url, {
    headers: { 'User-Agent': 'memoires-en-transit/1.0 (contact@example.com)' }
  });
  const data = await response.json();

  if (data && data.length > 0) {
    const lat = parseFloat(data[0].lat);
    const lon = parseFloat(data[0].lon);
    return [lat, lon];
  }
  return undefined;
}
