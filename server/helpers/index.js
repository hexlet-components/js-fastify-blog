// @ts-check

import i18next from "i18next";

export default (app) => ({
  route(name, placeholdersValues, options) {
    return app.reverse(name, placeholdersValues, options);
  },
  t(key) {
    return i18next.t(key);
  },
  getAlertClass(type) {
    switch (type) {
      case "error":
        return "border-red-200 bg-red-50 text-red-800";
      case "success":
        return "border-green-200 bg-green-50 text-green-800";
      case "info":
        return "border-blue-200 bg-blue-50 text-blue-800";
      default:
        throw new Error(`Unknown flash type: '${type}'`);
    }
  },
  formatDate(str) {
    const date = new Date(str);
    return date.toLocaleString();
  },
});
