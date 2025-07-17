export async function getPositionFromCity(cityAndCountry: string): Promise<[number, number] | undefined> {
  const query = encodeURIComponent(cityAndCountry);
  const url = `http://localhost:3000/locations?format=json&q=${query}&limit=1`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'User-Agent': 'memoires-en-transit/1.0 (contact@email.com)',
      'Accept': 'application/json',
      'Referer' : 'http://localhost:5173/'
    }
  });
  const data = await response.json();
  // TODO Enlever les éléments redondants avec l'appel api fait par le serveur

  if (data && data.length > 0) {
    const lat = parseFloat(data[0].lat);
    const lon = parseFloat(data[0].lon);
    return [lat, lon];
  }
  return undefined;
}

interface NominatimResult {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
}

export const searchLocation = async (query: string): Promise<NominatimResult[]> => {
  const url = `https://nominatim.openstreetmap.org/search`;

  const params = new URLSearchParams({
    format: 'json',
    q: query,
    limit: '10' // Optional: limit results
  });

  try {
    const response = await fetch(`${url}?${params}`, {
      method: 'GET',
      headers: {
        'User-Agent': 'MyGeoApp/1.0 (contact@myapp.com)',
        'Referer': 'https://myapp.com',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Nominatim API error: ${response.status}`);
    }

    const data: NominatimResult[] = await response.json();
    return data;
  } catch (error) {
    console.error('Geocoding error:', error);
    throw error;
  }
};