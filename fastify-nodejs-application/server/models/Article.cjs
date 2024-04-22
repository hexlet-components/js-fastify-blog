// @ts-check

const BaseModel = require('./BaseModel.cjs');

module.exports = class Article extends BaseModel {
  static get tableName() {
    return 'articles';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title', 'content'],
      properties: {
        id: { type: 'integer' },
        title: { type: 'string', minLength: 1 },
        content: { type: 'string', minLength: 3 },
      },
    };
  }
}
