// @ts-check

import pointOfView from 'point-of-view';
import Pug from 'pug';
import path from 'path';
import { fileURLToPath } from 'url';
import getHelpers from '../helpers/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default (fastify) => {
  const helpers = getHelpers(fastify);

  fastify.register(pointOfView, {
    engine: {
      pug: Pug,
    },
    includeViewExtension: true,
    defaultContext: {
      ...helpers,
    },
    templates: path.join(__dirname, '..', 'views'),
  });

  fastify.decorateReply('render', function render(viewPath, locals) {
    this.view(viewPath, { ...locals, reply: this });
  });
};
