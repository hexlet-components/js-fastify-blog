// @ts-check

import fp from 'fastify-plugin';
import sequelizeFastify from 'sequelize-fastify';

export default fp(async (fastify) => {
  console.log(process.env.TEST);
  fastify.register(sequelizeFastify, {
    instance: 'db',
    sequelizeOptions: {
      dialect: 'postgres',
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      options: {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
      },
    },
  });
});
