// @ts-check

import root from './root.js';
import articles from './articles.js';

const controllers = [
  root,
  articles,
];

export default (app) => controllers.forEach((fn) => fn(app));
