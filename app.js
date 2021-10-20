// @ts-check

import addRoutes from './routes/index.js';
import registerPluging from './plugins/index.js';

export default async (fastify, _opts) => {
  const mode = process.env.NODE_ENV ?? 'development';
  fastify.decorate('mode', mode);

  registerPluging(fastify);
  addRoutes(fastify);
};
