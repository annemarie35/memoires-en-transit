export async function getTestimonies(): Promise<Testimony[] | []> {
  const TESTIMONIES_URL = '/temoignages-enriched.json';
  try {
    const response = await fetch(TESTIMONIES_URL, { method: 'GET' });
    if (!response.ok) {
      throw new Error(`Testimonies fetch error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Testimonies error:', error);
    throw error;
  }
}

export type Testimony = {
  date: string;
  genre: string;
  birthPlace: string;
  birthDate: string;
  testimonyConcern: string;
  testifyingFor: string;
  testimonyCity: string;
  testimonyDepartment: string;
  testifyingForBithPlace: string;
  testimonyDate: string;
  testimonyTheme: string;
  testimony: string;
  testimonyLocation: Location | null; // exclu par Omit
};

type Location = [latitude, longitude];
type latitude = number
type longitude = number