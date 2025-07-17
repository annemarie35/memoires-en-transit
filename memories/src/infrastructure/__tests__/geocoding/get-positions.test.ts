import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getPositionFromCity } from '../../geocoding/get-positions.ts';

describe('getPositionFromCity (API)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns the correct position for Paris, France', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      json: async () => [{ lat: '48.8566', lon: '2.3522' }],
    } as never);
    const pos = await getPositionFromCity('Paris, France');
    expect(pos).toBeDefined();
    expect(pos![0]).toBeCloseTo(48.8566, 4);
    expect(pos![1]).toBeCloseTo(2.3522, 4);
  });

  it('returns undefined for an unknown city', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      json: async () => [],
    } as never);
    const pos = await getPositionFromCity('VilleInconnue, PaysInconnu');
    expect(pos).toBeUndefined();
  });
});
