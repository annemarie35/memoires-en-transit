import Hapi from '@hapi/hapi';
import { searchLocation } from "./locations";

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
      const results = await searchLocation(q, limit);
      if (format === 'json') {
        return results;
      } else {
        return h.response(results.map((loc: any) => loc.display_name).join('\n')).type('text/plain');
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