import { describe, it, expect } from 'vitest';
import cleanTestimonies from '../clean-data-script';

describe('cleanTestimonies', () => {
  it('should return an array of testimonies with renamed keys', async () => {
    const data = await cleanTestimonies();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(89);
    const testimony = data[0];
    expect(testimony).toHaveProperty('date');
    expect(testimony).toHaveProperty('genre');
    expect(testimony).toHaveProperty('birthDate');
    expect(testimony).toHaveProperty('testimony');
  });
}); 