// @ts-check

import errorPage from './errorPage.js';
import formbody from './formbody.js';
import i18next from './i18next.js';
import methodOverride from './methodOverride.js';
import pointOfView from './pointOfView.js';
import reverseRoutes from './reverseRoutes.js';
import secureSession from './secureSession.js';
import sensible from './sensible.js';
import sequelize from './sequelize.js';
import fastifyStatic from './static.js';

const plugins = [
  errorPage,
  formbody,
  i18next,
  methodOverride,
  pointOfView,
  reverseRoutes,
  secureSession,
  sensible,
  sequelize,
  fastifyStatic,
];

export default (app) => plugins.forEach((fn) => fn(app));
