import { Knex } from "knex";
import { config } from "dotenv";
config({ path: "../../.env" });

interface IKnexConfig {
  [key: string]: Knex.Config;
}

const configs: IKnexConfig = {
  development: {
    client: "mysql2",
    connection: process.env.MYSQL,
    pool: { min: 2, max: 10 },
    migrations: {
      disableMigrationsListValidation: true,
      extension: "ts",
    },
  },
};

export default configs;
