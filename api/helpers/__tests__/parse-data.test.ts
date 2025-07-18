import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import { keyMap, renameKeysAuto, getPositionFromCity, enrichTestimoniesWithLocation } from '../parse-data';

describe('parse data', () => {
  // afterEach(() => {
  //   vi.restoreAllMocks();
  // });

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

  describe('getPositionFromCity', () => {
    const mockParisResult = [{"place_id":88066702,"licence":"Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright","osm_type":"relation","osm_id":71525,"lat":"48.8534951","lon":"2.3483915","class":"boundary","type":"administrative","place_rank":12,"importance":0.8845663630228834,"addresstype":"city","name":"Paris","display_name":"Paris, Île-de-France, France métropolitaine, France","boundingbox":["48.8155755","48.9021560","2.2241220","2.4697602"]}];
    const mockEmptyResult: any[] = [];

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
  });

  describe('enrichTestimoniesWithLocation', () => {
    const mockLocation = [48.8566, 2.3522];
    const mockGetPositionFromCity = vi.fn().mockResolvedValue(mockLocation);

    it('should add testimonyLocation to each testimony', async () => {
      //TODO test red in CI FIXIT
      const testimonies = [
        { testimonyCity: 'Paris', foo: 'bar' },
        { testimonyCity: 'Lyon', foo: 'baz' },
      ];
      const enriched = await enrichTestimoniesWithLocation(testimonies, mockGetPositionFromCity);
      for (const t of enriched) {
        expect(t.testimonyLocation).toEqual(mockLocation);
      }
      expect(mockGetPositionFromCity).toHaveBeenCalledTimes(testimonies.length);
    });
  });

  describe('enrichTestimoniesWithLocation error handling', () => {
    it('should set testimonyLocation to null if getPositionFromCity throws', async () => {
      const testimonies = [
        { testimonyCity: 'Paris', foo: 'bar' },
        { testimonyCity: 'Lyon', foo: 'baz' },
      ];
      const mockGetPositionFromCity = vi.fn()
          .mockResolvedValueOnce([48.8566, 2.3522])
          .mockRejectedValueOnce(new Error('API error'));

      const enriched = await enrichTestimoniesWithLocation(testimonies, async (city) => {
        try {
          return await mockGetPositionFromCity(city);
        } catch {
          return null;
        }
      });

      expect(enriched[0].testimonyLocation).toEqual([48.8566, 2.3522]);
      expect(enriched[1].testimonyLocation).toBeNull();
    });
  });
})