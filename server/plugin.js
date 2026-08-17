// @ts-check

import dbPlugin from "./plugins/db.js";
import reversePlugin from "./plugins/reverse.js";
import fastifyFlash from "@fastify/flash";
import fastifyFormbody from "@fastify/formbody";
import fastifySecureSession from "@fastify/secure-session";
import fastifySensible from "@fastify/sensible";
import fastifyStatic from "@fastify/static";
// NOTE: не поддердивает fastify 4.x
// import fastifyErrorPage from 'fastify-error-page';
import fastifyView from "@fastify/view";
import i18next from "i18next";
import path from "path";
import Pug from "pug";
import qs from "qs";
import { fileURLToPath } from "url";
import getHelpers from "./helpers/index.js";
import en from "./locales/en.js";
import ru from "./locales/ru.js";
// @ts-expect-error
import addRoutes from "./routes/index.js";

const __dirname = fileURLToPath(path.dirname(import.meta.url));

const mode = process.env.NODE_ENV || "development";
const isDevelopment = mode === "development";

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
    templates: path.join(__dirname, "..", "server", "views"),
  });

  app.decorateReply("render", function render(viewPath, locals) {
    this.view(viewPath, { ...locals, reply: this });
  });
};

const setUpStaticAssets = (app) => {
  const pathPublic = path.join(__dirname, "..", "dist");
  app.register(fastifyStatic, {
    root: pathPublic,
    prefix: "/assets/",
  });
};

const setupLocalization = async () => {
  await i18next.init({
    lng: "en",
    fallbackLng: "ru",
    debug: isDevelopment,
    resources: {
      ru,
      en,
    },
  });
};

const addHooks = (app) => {
  app.addHook("preHandler", async (req, reply) => {
    reply.locals = {
      isAuthenticated: () => req.isAuthenticated(),
    };
  });
};

const registerPlugins = async (app) => {
  await app.register(dbPlugin);
  await app.register(fastifySensible);
  // await app.register(fastifyErrorPage);
  await app.register(reversePlugin);
  await app.register(fastifyFormbody, { parser: qs.parse });
  await app.register(fastifySecureSession, {
    secret: "4fe91796c30bd989d95b62dc46c7c3ba0b6aa2df2187400586a4121c54c53b85",
    cookie: {
      path: "/",
    },
  });
  await app.register(fastifyFlash);
};

export const options = {
  exposeHeadRoutes: false,
};

// eslint-disable-next-line no-unused-vars
export default async (app, _options) => {
  await registerPlugins(app);

  await setupLocalization();
  setUpViews(app);
  setUpStaticAssets(app);
  addRoutes(app);
  addHooks(app);

  return app;
};
