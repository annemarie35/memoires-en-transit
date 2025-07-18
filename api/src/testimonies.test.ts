import { describe, it, expect, beforeAll } from 'vitest';
import Hapi from '@hapi/hapi';
import { createServer } from '../server';

describe('GET /testimonies', () => {
  let server: Hapi.Server;

  beforeAll(async () => {
    server = await createServer();
  });

  it('should return an array of testimonies', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/testimonies',
    });
    expect(response.statusCode).toBe(200);
    const data = JSON.parse(response.payload);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });
}); 