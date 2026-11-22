// @ts-check

/**
 * Приводит ошибки zod к виду, который ожидают шаблоны: массив объектов
 * `{ path, message }`. Ровно так выглядели ошибки Sequelize, и миксины форм
 * группируют их по `path`.
 */
export const formatErrors = (error) =>
  error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));
