// @ts-check

import fp from 'fastify-plugin';
import sequelizeFastify from 'sequelize-fastify';
import dbConfig from '../config/config.cjs';
import db from '../models/index.cjs';

export default fp(async (fastify) => {
  fastify
    .register(sequelizeFastify, {
      instance: 'db',
      sequelizeOptions: dbConfig[fastify.mode],
    })
    .after((err) => {
      if (err) throw err;
      // NOTE: sequelize do not add models to instance
      // eslint-disable-next-line
      fastify.db.models = db.sequelize.models;
    });
});
