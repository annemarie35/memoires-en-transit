import Hapi from '@hapi/hapi';
import { searchLocation } from "./locations";
import { createClient } from 'redis';
import * as fs from 'fs/promises';

const redisClient = createClient();
redisClient.connect();

const GEOCODING_TTL = 7 * 24 * 60 * 60; // 7 jours

export async function createServer() {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      cors: true
    }
  });

  server.route({
    method: 'GET',
    path: '/locations',
    handler: async (request, h) => {
      const { q = '', limit = '1', format = 'json' } = request.query;
      const cacheKey = `locations:${q}:${limit}`;
      const cached = await redisClient.get(cacheKey);
      if (cached) {
        const results = JSON.parse(cached);
        if (format === 'json') {
          return results;
        } else {
          return h.response(results.map((loc: any) => loc.display_name).join('\n')).type('text/plain');
        }
      }
      const results = await searchLocation(q, limit);
      await redisClient.setEx(cacheKey, GEOCODING_TTL, JSON.stringify(results));
      if (format === 'json') {
        return results;
      } else {
        return h.response(results.map((loc: any) => loc.display_name).join('\n')).type('text/plain');
      }
    },
  });

  server.route({
    method: 'GET',
    path: '/testimonies',
    handler: async (request, h) => {
      const DATA_PATH= 'data/temoignages-enriched.json'
      try {
        const data = await fs.readFile(DATA_PATH, 'utf-8');
        const testimonies = JSON.parse(data);
        return testimonies
      } catch (err) {
        console.error('Erreur de lecture des temoignages:', err);
        return h.response({ error: 'Impossible de lire les témoignages' }).code(500);
      }
    },
  });

  return server;
}

async function startServer() {
  const server = await createServer();
  await server.start();
  console.log('Server running on %s', server.info.uri);
}

if (require.main === module) {
  startServer();
} 