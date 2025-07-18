import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import { keyMap, renameKeysAuto, getPositionFromCity } from '../parse-data';

describe('renameKeysAuto', () => {
  const jsonPath = path.resolve(__dirname, 'raw-data-test.json');
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  const result = renameKeysAuto(data, keyMap);
  const first = result[0];

  it.each(Object.entries(keyMap))(
    'maps "%s" to "%s" (new key exists, old key does not)',
    (oldKey, newKey) => {
      expect(first).toHaveProperty(newKey);
      expect(first).not.toHaveProperty(oldKey);
    }
  );
});

const mockParisResult = [{"place_id":88066702,"licence":"Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright","osm_type":"relation","osm_id":71525,"lat":"48.8534951","lon":"2.3483915","class":"boundary","type":"administrative","place_rank":12,"importance":0.8845663630228834,"addresstype":"city","name":"Paris","display_name":"Paris, Île-de-France, France métropolitaine, France","boundingbox":["48.8155755","48.9021560","2.2241220","2.4697602"]}];

const mockEmptyResult: any[] = [];

describe('getPositionFromCity', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return an array with at least one result for a known city', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockParisResult,
    } as any);

    const result = await getPositionFromCity('Paris');
    expect(result).toStrictEqual([
          48.8534951,
          2.3483915,
        ]
    );
  });

  it('should return an empty array for an unknown city', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockEmptyResult,
    } as any);

    const result = await getPositionFromCity('VilleInconnueTestUnitaire');
    expect(result).toBe(null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
});
