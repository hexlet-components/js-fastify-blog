// @ts-check

import addRoutes from './routes/index.js';
import registerPlugins from './plugins/index.js';

export default async (fastify, _opts) => {
  const mode = process.env.NODE_ENV ?? 'development';
  fastify.decorate('mode', mode);

  registerPlugins(fastify);
  addRoutes(fastify);
};
