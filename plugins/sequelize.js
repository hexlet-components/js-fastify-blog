// @ts-check

import fp from 'fastify-plugin';
import sequelizeFastify from 'sequelize-fastify';
import dbConfig from '../config/config.cjs';

export default fp(async (fastify) => {
  const mode = process.env.NODE_ENV ?? 'development';

  fastify.register(sequelizeFastify, {
    instance: 'db',
    sequelizeOptions: dbConfig[mode],
  });
});
