import knex from "knex";
import configs from "./knexfile";

const config = configs["development"];

const Knex = knex(config);

export default Knex;
