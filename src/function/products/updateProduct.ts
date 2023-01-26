import { Request, Response } from "express";
import Knex from "../../database/db";
import jwt from "jsonwebtoken";

export default async (req: Request, res: Response) => {
  const { id } = req.params;
  const { token } = req.query;
  const { name, description } = req.body;
  if (!token) return res.status(401).send("request forbidden!!!");
  if (!name)
    return res.status(400).json({
      error: "name is required!",
    });
  const decode = jwt.decode(token as string, {
    json: true,
  });
  if (decode?.type === "admin") {
    await Knex.table("products")
      .where({ id })
      .update({
        name,
        description,
        updated_at: Knex.fn.now(),
      })
      .then((data) => {
        if (data) {
          return res.status(200).json({
            message: "product update successfully!",
          });
        }
        return res.status(400).json({
          message: "something went wrong!!!",
        });
      })
      .catch((err) => {
        return res.status(500).json({ message: err });
      });
  } else {
    const result = await Knex.table("products")
      .where({ id, user_id: decode?.id })
      .first();
    if (result) {
      await Knex.table("products")
        .where({ id })
        .update({
          name,
          description,
          updated_at: Knex.fn.now(),
        })
        .then((data) => {
          if (data) {
            return res.status(200).json({
              message: "product update successfully!",
            });
          }
          return res.status(400).json({
            message: "something went wrong!!!",
          });
        })
        .catch((err) => {
          return res.status(500).json({ message: err });
        });
    } else {
      return res
        .status(400)
        .json({ message: "you can not update this product" });
    }
  }
};
