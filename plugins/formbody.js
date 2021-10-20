// @ts-check

import fastifyFormbody from 'fastify-formbody';
import qs from 'qs';

export default (fastify) => {
  fastify.register(fastifyFormbody, { parser: qs.parse });
};
