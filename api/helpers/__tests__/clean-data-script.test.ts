import { describe, it, expect, vi } from 'vitest';
import fs from 'fs/promises';
import path from 'path';
import { renameKeysAuto, keyMap, enrichTestimoniesWithLocation } from '../parse-data';

const TEST_CLEAN_PATH = path.join(__dirname, '../../data/temoignages-clean.test.json');
const TEST_ENRICHED_PATH = path.join(__dirname, '../../data/temoignages-enriched.test.json');

describe('clean-data-script integration', () => {
  it('should clean and enrich testimonies, handling errors', async () => {
    const testimonies = [
      { 'Carimbo de data/hora': 'date', 'Vous êtes ?': 'genre', 'Où êtes vous né.e ?': 'birth', 'Votre témoignage': 'foo', 'Dans quelle ville se situe votre témoignage ?': 'Paris' },
      { 'Carimbo de data/hora': 'date', 'Vous êtes ?': 'genre', 'Où êtes vous né.e ?': 'birth', 'Votre témoignage': 'bar', 'Dans quelle ville se situe votre témoignage ?': 'Lyon' },
    ];
    const cleaned = renameKeysAuto(testimonies, keyMap);
    await fs.writeFile(TEST_CLEAN_PATH, JSON.stringify(cleaned, null, 2), 'utf-8');

    const mockGetPositionFromCity = vi.fn()
      .mockResolvedValueOnce([48.8566, 2.3522])
      .mockRejectedValueOnce(new Error('API error'));

    const safeGetPositionFromCity = async (city: string) => {
      try {
        return await mockGetPositionFromCity(city);
      } catch {
        return null;
      }
    };
    const enriched = await enrichTestimoniesWithLocation(cleaned, safeGetPositionFromCity);
    await fs.writeFile(TEST_ENRICHED_PATH, JSON.stringify(enriched, null, 2), 'utf-8');

    const enrichedRead = JSON.parse(await fs.readFile(TEST_ENRICHED_PATH, 'utf-8'));
    expect(enrichedRead[0].testimonyLocation).toEqual([48.8566, 2.3522]);
    expect(enrichedRead[1].testimonyLocation).toBeNull();
  });
}); 