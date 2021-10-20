// @ts-check

import i18next from 'i18next';
import ru from '../locales/ru.js';

export default (fastify) => {
  i18next
    .init({
      lng: 'ru',
      fallbackLng: 'ru',
      debug: fastify.mode === 'development',
      resources: {
        ru,
      },
    })
    .then(() => {
      fastify.decorate('t', (key) => i18next.t(key));
    });
};
