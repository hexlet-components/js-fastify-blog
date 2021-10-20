// @ts-check

import db from '../models/index.cjs';

export default (fastify) => {
  fastify.decorate('db', db.sequelize);
  fastify.addHook('onClose', async () => {
    await db.sequelize.close();
  });

  // NOTE: sequelize-fastify внутри использует колбеки
  // https://github.com/hsynlms/sequelize-fastify/blob/c3041ddfee4811777674167841fd5a18c3648fed/src/index.js#L22-L25
  // в результате сервер останавливается раньше чем соединение с БД
  // и в тестах выводится Jest did not exit one second after the test run has completed.
  // Также sequelize-fastify не загружает models и не добавляет их к инстансу,
  // это приходится делать вручную с помощью генерируемого sequelize фала models/index.cjs
  // Таким образом открывается ещё одно соединение к БД.
  // В итоге вручную подключить sequelize проще и работает всё корректно.
  // Ниже закоментировано подключение с помощью sequelize-fastify

  // await fastify.register(sequelizeFastify, {
  //   instance: 'db',
  //   sequelizeOptions: dbConfig[fastify.mode],
  // });
  // // eslint-disable-next-line
  // fastify.db.models = db.sequelize.models;
};
