import { Request, Response } from "express";
import Knex from "../../database/db";

export default async (req: Request, res: Response) => {
  let product;
  const { id } = req.params;
  const result = await Knex.table("products").where({ id }).first();
  if (!result) return res.status(404).json({ message: "product not found!!!" });
  const user = await Knex.table("users")
    .where({ id: result.user_id })
    .first("id", "name", "username", "created_at", "updated_at");
  product = {
    id: result.id,
    name: result.name,
    description: result.description,
    created_at: result.created_at,
    updated_at: result.updated_at,
    user: user,
  };
  return res.status(200).json({
    product,
  });
};
