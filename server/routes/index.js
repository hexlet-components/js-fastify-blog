// @ts-check

import articles from "./articles.js";
import comments from "./comments.js";
import root from "./root.js";

const controllers = [root, articles, comments];

export default (app) => {
  controllers.forEach((f) => {
    f(app);
  });
};
