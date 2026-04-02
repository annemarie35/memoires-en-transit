interface NominatimResult {
    addresstype: string;
    boundingbox: string[];
    class: string;
    display_name: string;
    importance: number;
    lat: string;
    licence: string;
    osm_id: number;
    osm_type: string;
    lon: string;
    name: string;
    place_id: number;
    place_rank: number;
    type: string;
}

export const searchLocation = async (query: string, limit: string | number = '1'): Promise<NominatimResult[]> => {
    const url = `https://nominatim.openstreetmap.org/search`;

    const params = new URLSearchParams({
        format: 'json',
        q: query,
        limit: String(limit)
    });

    try {
        const response = await fetch(`${url}?${params}`, {
            method: 'GET',
            headers: {
                'User-Agent': 'memoires-en-transit/1.0 (contact@email.com)',
                'Referer': 'http://localhost:5173/',
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