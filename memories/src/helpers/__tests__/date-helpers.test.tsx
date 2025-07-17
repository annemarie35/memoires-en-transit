import { describe, expect, it } from 'vitest';
import { extractYear } from '../date-helpers.ts';

describe('extractYear', () => {
  it("transform JJ/MM/AAAA to AAAA", () => {
    expect(extractYear('05/04/1975')).toBe('1975');
    expect(extractYear('29/12/1969')).toBe('1969');
    expect(extractYear('1975')).toBe('1975');
    expect(extractYear('')).toBe('');
    expect(extractYear('05-04-1975')).toBe('05-04-1975');
  });
});