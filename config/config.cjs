require('dotenv').config();

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './database.sqlite',
  },
  test: {
    dialect: 'sqlite',
    storage: './database.test.sqlite',
  },
  production: {
    dialect: 'sqlite',
    storage: './database.production.sqlite',
  },
  // test: {
  //   dialect: 'postgres',
  //   database: process.env.DATABASE_NAME,
  //   username: process.env.DATABASE_USERNAME,
  //   password: process.env.DATABASE_PASSWORD,
  //   port: process.env.DATABASE_PORT,
  //   host: process.env.DATABASE_HOST,
  // },
  // production: {
  //   dialect: 'postgres',
  //   database: process.env.DATABASE_NAME,
  //   username: process.env.DATABASE_USERNAME,
  //   password: process.env.DATABASE_PASSWORD,
  //   port: process.env.DATABASE_PORT,
  //   host: process.env.DATABASE_HOST,
  // },
};
