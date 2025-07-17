import Hapi from '@hapi/hapi';

async function startServer() {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
  });

  server.route({
    method: 'GET',
    path: '/locations',
    handler: () => {
      return [
        { city: 'Paris', lat: 48.8566, lng: 2.3522 },
        { city: 'Lyon', lat: 45.764, lng: 4.8357 },
        { city: 'Marseille', lat: 43.2965, lng: 5.3698 },
      ];
    },
  });


  await server.start();
  console.log('Server running on %s', server.info.uri);
}

startServer(); 