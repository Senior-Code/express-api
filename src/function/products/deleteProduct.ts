import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Knex from "../../database/db";

export default async (req: Request, res: Response) => {
  const { id } = req.params;
  const { token } = req.query;
  if (!token) return res.status(400).send("request forbidden!!!");
  const decode = jwt.decode(token as string, {
    json: true,
  });
  if (decode?.type === "admin") {
    await Knex.table("products")
      .where({ id })
      .delete()
      .catch((err) => {
        return res.status(500).json({
          message: err,
        });
      })
      .then((data) => {
        if (data) {
          return res.status(200).json({
            message: "delete product successfully!!!",
          });
        }
        return res.status(500).json({ message: "something went wrong!" });
      });
  } else {
    const result = await Knex.table("products")
      .where({ id, user_id: decode?.id })
      .first();
    if (result) {
      await Knex.table("products")
        .where({ user_id: decode?.id, id })
        .delete()
        .catch((err) => {
          return res.status(500).json({
            message: err,
          });
        })
        .then((data) => {
          if (data) {
            return res.status(200).json({
              message: "delete product successfully!!!",
            });
          }
          return res.status(500).json({ message: "something went wrong!" });
        });
    } else {
      return res
        .status(400)
        .json({ message: "you can not delete this product" });
    }
  }
};
