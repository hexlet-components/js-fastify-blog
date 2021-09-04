// @ts-check

import path from 'path';
import { fileURLToPath } from 'url';
import AutoLoad from 'fastify-autoload';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async (fastify, opts) => {
  const mode = process.env.NODE_ENV ?? 'development';
  fastify.decorate('mode', mode);
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: { ...opts },
  });

  // // This loads all plugins defined in routes
  // // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: { ...opts },
  });
};
