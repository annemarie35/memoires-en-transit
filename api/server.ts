import Hapi from '@hapi/hapi';
import { searchLocation } from "./locations";

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
      console.log('q', q)

      const results = await searchLocation(q, limit);
      console.log('results', results)
      if (format === 'json') {
        return results;
      } else {
        return h.response(results.map(loc => loc.display_name).join('\n')).type('text/plain');
      }
    },
  });


  await server.start();
  console.log('Server running on %s', server.info.uri);
}

startServer(); 