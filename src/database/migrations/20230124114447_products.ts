import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("products", (table) => {
    table.increments("id").index();
    table.string("name");
    table.string("description");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {}
