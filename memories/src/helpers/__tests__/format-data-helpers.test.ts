import { describe, it, expect, vi, beforeEach } from 'vitest';
import path from 'path';
import { csvToJson } from '../format-data-helpers.ts';
import { getPositionFromCity } from '../format-data-helpers.ts';


describe('getPositionFromCity (API)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns the correct position for Paris, France', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      json: async () => [{ lat: '48.8566', lon: '2.3522' }],
    } as never);
    const pos = await getPositionFromCity('Paris', 'France');
    expect(pos).toBeDefined();
    expect(pos![0]).toBeCloseTo(48.8566, 4);
    expect(pos![1]).toBeCloseTo(2.3522, 4);
  });

  it('returns undefined for an unknown city', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      json: async () => [],
    } as never);
    const pos = await getPositionFromCity('VilleInconnue', 'PaysInconnu');
    expect(pos).toBeUndefined();
  });
});

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
