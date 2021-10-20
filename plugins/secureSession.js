// @ts-check

import fastifySecureSession from 'fastify-secure-session';
import fastifyFlash from 'fastify-flash';
import crypto from 'crypto';

export default (fastify) => {
  fastify
    .register(fastifySecureSession, {
      secret: process.env.SESSION_KEY ?? crypto.randomBytes(32).toString('hex'),
      cookie: {
        path: '/',
      },
    })
    .register(fastifyFlash);
};
