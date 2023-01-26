import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Knex from "../../database/db";

export default async (req: Request, res: Response) => {
  let data;
  const { token } = req.query;
  if (token) {
    const decode = jwt.decode(token as string, { json: true });
    const result = await Knex.table("products")
      .where({ user_id: decode?.id })
      .select();
    data = {
      user: decode,
      products: result,
    };
    return res.status(200).json({
      data: data,
    });
  } else {
    const result = await Knex.table("products").select();
    data = {
      products: result,
    };
    return res.status(200).json({
      data: data,
    });
  }
};
