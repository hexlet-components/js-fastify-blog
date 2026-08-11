// Точка входа для схемы: отдаёт таблицы того диалекта, который выбран
// окружением. Благодаря этому маршруты и валидатор импортируют `articles`
// одинаково и про диалект ничего не знают.
//
// Выбор делается на загрузке модуля, а не на каждом запросе: DATABASE_CLIENT
// в течение процесса не меняется.
import * as pg from "./pg.js";
import * as sqlite from "./sqlite.js";

export const isPostgres = process.env.DATABASE_CLIENT === "postgres";

const schema = isPostgres ? pg : sqlite;

export const { articles } = schema;
export default schema;
