import Hapi from '@hapi/hapi';
import { searchLocation } from "./locations";
import { createClient } from 'redis';

const redisClient = createClient();
redisClient.connect();

const GEOCODING_TTL = 7 * 24 * 60 * 60; // 7 jours
//

async function startServer() {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    //TODO Fix Cors issue
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
      // 1. Cherche dans le cache Redis
      const cached = await redisClient.get(cacheKey);
      if (cached) {
        const results = JSON.parse(cached);
        if (format === 'json') {
          return results;
        } else {
          return h.response(results.map((loc: any) => loc.display_name).join('\n')).type('text/plain');
        }
      }
      // 2. Sinon, appelle l'API et met en cache
      const results = await searchLocation(q, limit);
      await redisClient.setEx(cacheKey, GEOCODING_TTL, JSON.stringify(results));
      if (format === 'json') {
        return results;
      } else {
        return h.response(results.map((loc: any) => loc.display_name).join('\n')).type('text/plain');
      }
    },
  });


  await server.start();
  console.log('Server running on %s', server.info.uri);
}

startServer(); 