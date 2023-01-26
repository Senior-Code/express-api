import { Request, Response } from "express";
import Knex from "../../database/db";
import jwt from "jsonwebtoken";

export default async (req: Request, res: Response) => {
  const { token } = req.query;
  if (!token) return res.status(400).send("request forbidden!!!");
  const decode = jwt.decode(token as string, {
    json: true,
  });
  if (decode?.type === "admin") {
    const result = await Knex.table("users").select();
    return res.status(200).json({
      data: {
        users: result,
      },
    });
  } else {
    const result = await Knex.table("users")
      .where("type", "user")
      .select("id", "name", "username", "type", "created_at", "updated_at");
    return res.status(200).json({
      data: {
        users: result,
      },
    });
  }
};
