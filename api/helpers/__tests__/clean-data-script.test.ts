import { describe, it, expect, vi } from "vitest";
import {toto} from "../clean-data-script";

const { mockReadFile, mockWriteFile } = vi.hoisted(() => {
  const mockTestimonies = [
    {
      'Carimbo de data/hora': '01/01/2020',
      'Vous êtes ?': 'Un homme',
      'Où êtes vous né.e ?': 'Portugal',
      'Quelle est votre date de naissance ?': '24/08/1988',
      'Dans quelle ville se situe votre témoignage ?': 'Paris',
      'Votre témoignage': 'Mon témoignage',
    },
  ];
  return {
    mockReadFile: vi.fn().mockResolvedValue(JSON.stringify(mockTestimonies)),
    mockWriteFile: vi.fn().mockResolvedValue(undefined),
  };
});

vi.mock('fs/promises', () => ({
  default: {
    readFile: mockReadFile,
    writeFile: mockWriteFile,
  },
}));

const mockParisResult = [
  {
    place_id: 88066702,
    lat: '48.8534951',
    lon: '2.3483915',
    name: 'Paris',
    display_name: 'Paris, Île-de-France, France métropolitaine, France',
  },
];


describe('toto', () => {
  it('should read testimonies, enrich with location and parse birthDate', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockParisResult,
    } as any);

    const response = await toto();

    expect(mockReadFile).toHaveBeenCalledWith(expect.stringContaining('temoignages.json'), 'utf-8');
    expect(response[0].testimonyLocation).toEqual([48.8534951, 2.3483915]);
    expect(response[0].birthDate).toBe('1988');
  });
});
