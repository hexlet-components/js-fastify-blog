// @ts-check

import { fileURLToPath } from 'url';
import path from 'path';
import fastifyStatic from '@fastify/static';
// NOTE: не поддердивает fastify 4.x
// import fastifyErrorPage from 'fastify-error-page';
import fastifyView from '@fastify/view';
import fastifyFormbody from '@fastify/formbody';
import fastifySecureSession from '@fastify/secure-session';
import fastifyFlash from '@fastify/flash';
import fastifySensible from '@fastify/sensible';
import { plugin as fastifyReverseRoutes } from 'fastify-reverse-routes';
import fastifyMethodOverride from 'fastify-method-override';
import qs from 'qs';
import Pug from 'pug';
import i18next from 'i18next';

import ru from './locales/ru.js';
import en from './locales/en.js';
// @ts-ignore
import addRoutes from './routes/index.js';
import getHelpers from './helpers/index.js';
import db from './db/models/index.cjs'

const __dirname = fileURLToPath(path.dirname(import.meta.url));

const mode = process.env.NODE_ENV || 'development';
const isDevelopment = mode === 'development';

const setUpDb = (app) => {
  app.decorate('db', db.sequelize);
  app.addHook('onClose', async () => {
    await db.sequelize.close();
  });
};

const setUpViews = (app) => {
  const helpers = getHelpers(app);
  app.register(fastifyView, {
    engine: {
      pug: Pug,
    },
    includeViewExtension: true,
    defaultContext: {
      ...helpers,
      assetPath: (filename) => `/assets/${filename}`,
    },
    templates: path.join(__dirname, '..', 'server', 'views'),
  });

  app.decorateReply('render', function render(viewPath, locals) {
    this.view(viewPath, { ...locals, reply: this });
  });
};

const setUpStaticAssets = (app) => {
  const pathPublic = path.join(__dirname, '..', 'dist');
  app.register(fastifyStatic, {
    root: pathPublic,
    prefix: '/assets/',
  });
};

const setupLocalization = async () => {
  await i18next
    .init({
      lng: 'en',
      fallbackLng: 'ru',
      debug: isDevelopment,
      resources: {
        ru,
        en,
      },
    });
};

const addHooks = (app) => {
  app.addHook('preHandler', async (req, reply) => {
    reply.locals = {
      isAuthenticated: () => req.isAuthenticated(),
    };
  });
};

const registerPlugins = async (app) => {
  await app.register(fastifySensible);
  // await app.register(fastifyErrorPage);
  await app.register(fastifyReverseRoutes);
  await app.register(fastifyFormbody, { parser: qs.parse });
  await app.register(fastifySecureSession, {
    secret: '4fe91796c30bd989d95b62dc46c7c3ba0b6aa2df2187400586a4121c54c53b85',
    cookie: {
      path: '/',
    },
  });
  await app.register(fastifyFlash);
  await app.register(fastifyMethodOverride);
};

export const options = {
  exposeHeadRoutes: false,
};

// eslint-disable-next-line no-unused-vars
export default async (app, _options) => {
  await registerPlugins(app);

  await setupLocalization();
  setUpDb(app);
  setUpViews(app);
  setUpStaticAssets(app);
  addRoutes(app);
  addHooks(app);

  return app;
};
