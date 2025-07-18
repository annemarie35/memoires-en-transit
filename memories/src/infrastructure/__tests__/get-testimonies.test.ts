import { vi } from 'vitest';
import { getTestimonies } from '../get-testimonies.ts';

global.fetch = vi.fn();

describe('getTestimonies (API)', () => {
  it('should fetch testimonies and return the data', async () => {
    const mockData = [
      {
        date: '2024-01-01',
        genre: 'F',
        birthPlace: 'Paris',
        birthDate: '1990-01-01',
        testimonyConcern: 'Famille',
        testifyingFor: 'Soeur',
        testimonyCity: 'Paris',
        testimonyDepartment: '75',
        testifyingForBithPlace: 'Lyon',
        testimonyDate: '2024-01-01',
        testimonyTheme: 'Exil',
        testimony: 'Un témoignage.',
        testimonyLocation: [48.8566, 2.3522],
      },
    ];
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await getTestimonies();
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/testimonies', { method: 'GET' });
  });
});
