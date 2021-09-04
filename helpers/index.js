// @ts-check

import i18next from 'i18next';
import _ from 'lodash';

export default (app) => ({
  route(name, placeholdersValues) {
    return app.reverse(name, placeholdersValues);
  },
  t(key) {
    return i18next.t(key);
  },
  _,
  getAlertClass(type) {
    switch (type) {
      case 'error':
        return 'danger';
      case 'info':
        return 'info';
      case 'success':
        return 'success';
      default:
        throw new Error(`Unknown type: '${type}'`);
    }
  },
  formatDate(str) {
    const date = new Date(str);
    return date.toLocaleString();
  },
});
