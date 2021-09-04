// @ts-check

import fp from 'fastify-plugin';
import i18next from 'i18next';
import ru from '../locales/ru.js';

export default fp(async (fastify) => {
  await i18next
    .init({
      lng: 'ru',
      fallbackLng: 'ru',
      debug: fastify.mode === 'development',
      resources: {
        ru,
      },
    });
  fastify.decorate('t', (...args) => i18next.t(...args));
});
