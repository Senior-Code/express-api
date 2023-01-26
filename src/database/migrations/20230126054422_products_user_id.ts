import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table("prodcuts", (table) => {
    table.integer("user_id").index();
  });
}

export async function down(knex: Knex): Promise<void> {}
