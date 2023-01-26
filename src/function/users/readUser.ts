import { Request, Response } from "express";
import Knex from "../../database/db";
import jwt from "jsonwebtoken";

export default async (req: Request, res: Response) => {
  const { id } = req.params;
  const { token } = req.query;
  const decode = jwt.decode(token as string, {
    json: true,
  });
  if (decode?.type === "admin") {
    const result = await Knex.table("users").where({ id }).first();
    return res.status(200).json({ data: result });
  } else {
    const result = await Knex.table("users")
      .whereNot("type", "admin")
      .andWhere({ id })
      .first();
    if (!result) return res.status(404).json({ message: "user not found!" });
    return res.status(200).json({
      data: result,
    });
  }
};
