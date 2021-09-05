// @ts-check

import fp from 'fastify-plugin';
import fastifyStatic from 'fastify-static';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default fp(async (fastify) => {
  fastify.register(fastifyStatic, {
    root: path.join(__dirname, '..', 'node_modules', 'bootstrap', 'dist'),
    prefix: '/assets/',
  });
});
