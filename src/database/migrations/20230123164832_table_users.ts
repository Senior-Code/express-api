import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").index();
    table.string("name");
    table.string("username");
    table.string("password");
    table.string("token");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {}
