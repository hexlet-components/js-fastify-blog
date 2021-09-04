// @ts-check

import fp from 'fastify-plugin';
import pointOfView from 'point-of-view';
import Pug from 'pug';
import path from 'path';
import { fileURLToPath } from 'url';
import helpers from '../helpers/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default fp(async (fastify) => {
  fastify.register(pointOfView, {
    engine: {
      pug: Pug,
    },
    includeViewExtension: true,
    defaultContext: {
      ...helpers,
      assetPath: (filename) => `${domain}/assets/${filename}`,
    },
    templates: path.join(__dirname, '..', 'views'),
  });
});
