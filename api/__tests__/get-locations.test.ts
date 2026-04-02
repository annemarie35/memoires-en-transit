import { describe, it, expect, beforeAll, vi } from 'vitest';
import Hapi from '@hapi/hapi';
import { createServer } from '../server';
import * as locations from '../get-locations';

vi.spyOn(locations, 'searchLocation').mockResolvedValue([
    {
        addresstype: 'suburb',
        boundingbox: [ '48.8155755', '48.9021560', '2.2241220', '2.4697602' ],
        class: 'boundary',
        display_name: 'Paris, Île-de-France, France métropolitaine, France',
        importance: 0.897098092136026,
        lat: '48.8588897',
        licence: 'Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright',
        lon: '2.3200410',
        osm_id: 7444,
        osm_type: 'relation',
        name: 'Paris',
        place_id: 90003570,
        place_rank: 15,
        type: 'administrative',
    }
]);

describe('GET /locations', () => {
    let server: Hapi.Server;

    beforeAll(async () => {
        server = await createServer();
    });

    const parisLocation = [
        {
            place_id: 90003570,
            licence: 'Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright',
            osm_type: 'relation',
            osm_id: 7444,
            lat: '48.8588897',
            lon: '2.3200410',
            class: 'boundary',
            type: 'administrative',
            place_rank: 15,
            importance: 0.897098092136026,
            addresstype: 'suburb',
            name: 'Paris',
            display_name: 'Paris, Île-de-France, France métropolitaine, France',
            boundingbox: [ '48.8155755', '48.9021560', '2.2241220', '2.4697602' ]
        }
    ]

    it('should return an array of locations', async () => {
        const response = await server.inject({
            method: 'GET',
            url: '/locations?q=paris',
        });
        expect(response.statusCode).toBe(200);
        const data = JSON.parse(response.payload);
        expect(Array.isArray(data)).toBe(true);
        expect(data[0].name).toBe(parisLocation[0].name);
        expect(data[0].lat).toBe(parisLocation[0].lat);
        expect(data[0].lon).toBe(parisLocation[0].lon);
    });
});

