// @ts-check

import fp from 'fastify-plugin';
import sequelizeFastify from 'sequelize-fastify';
import dbConfig from '../config/config.cjs';
import db from '../models/index.cjs';

export default fp(async (fastify) => {
  const mode = process.env.NODE_ENV ?? 'development';

  fastify
    .register(sequelizeFastify, {
      instance: 'db',
      sequelizeOptions: dbConfig[mode],
    })
    .after((err) => {
      if (err) throw err;
      // NOTE: sequelize do not add models to instance
      // eslint-disable-next-line
      fastify.db.models = db.sequelize.models;
    });
});
