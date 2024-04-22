export const up = (knex) => (
  knex.schema.createTable('articles', (table) => {
    table.increments('id').primary();
    table.string('title');
    table.text('content');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
);

export const down = (knex) => knex.schema.dropTable('articles');
