import { describe, it, expect } from 'vitest';
import path from 'path';
import { csvToJson } from '../format-data-helpers';

describe('csvToJson', () => {
  it('transform a csv into a json', () => {
    const csvPath = path.resolve(__dirname, 'raw-data-test.csv');
    const json = csvToJson(csvPath);
    expect(Array.isArray(json)).toBe(true);
    expect(json.length).toBeGreaterThan(0);
    expect(json[0]).toHaveProperty('Carimbo de data/hora');
    expect(json[0]).toHaveProperty('Vous êtes ?');
  });
});
