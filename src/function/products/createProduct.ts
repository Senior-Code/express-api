import { Request, Response } from "express";
import Knex from "../../database/db";
import jwt from "jsonwebtoken";

export default async (req: Request, res: Response) => {
  const { token } = req.query;
  if (!token) return res.status(401).send("request forbidden!!!");
  const decode = jwt.decode(token as string, {
    json: true,
  });
  const { name, description } = req.body;
  if (decode) {
    if (!name) return res.status(400).json({ error: "name is required!" });
    await Knex.table("products")
      .insert({
        name,
        description,
        user_id: decode.id,
      })
      .then((data) => {
        if (data) {
          return res
            .status(201)
            .json({ message: "product create successfully!" });
        }
        return res.status(500).json({ message: "something went wrong!" });
      })
      .catch((err) => {
        return res.status(500).json({
          message: err,
        });
      });
  } else {
    return res.status(401).send("request forbidden!!!");
  }
};
