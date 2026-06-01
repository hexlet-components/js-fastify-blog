// @ts-check

import articles from './articles.js';
import root from './root.js';

const controllers = [root, articles];

export default (app) => {
  controllers.forEach((f) => {
    f(app);
  });
};
