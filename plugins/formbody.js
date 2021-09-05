// @ts-check

import fp from 'fastify-plugin';
import fastifyFormbody from 'fastify-formbody';
import qs from 'qs';

export default fp(async (fastify) => {
  fastify.register(fastifyFormbody, { parser: qs.parse });
});
