require('dotenv').config();

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './database.sqlite',
  },
  test: {
    // NOTE: при выполнении проекта нужно использовать подключение к postgresql
    // Конфиг нужно скопировать из production и зменить им содержимое конфига test
    dialect: 'sqlite',
    storage: './database.test.sqlite',
  },
  production: {
    dialect: 'postgres',
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    host: process.env.DATABASE_HOST,
  },
};
