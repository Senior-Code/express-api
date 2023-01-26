import { Request, Response } from "express";
import Knex from "../../database/db";

export default async (req: Request, res: Response) => {
  const result = await Knex.table("products").select();
  return res.status(200).json({
    data: {
      products: result,
    },
  });
};
