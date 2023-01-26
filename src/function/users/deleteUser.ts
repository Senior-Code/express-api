import { Request, Response } from "express";
import Knex from "../../database/db";
import jwt from "jsonwebtoken";

export default async (req: Request, res: Response) => {
  const { id } = req.params;
  const { token } = req.query;
  if (!token) return res.status(400).send("request forbidden!!!");
  const decode = jwt.decode(token as string, {
    json: true,
  });
  if (decode?.type === "admin") {
    await Knex.table("users")
      .where({ id })
      .delete()
      .then(async (data) => {
        if (data) {
          await Knex.table("products").where({ user_id: id }).delete();
          return res.status(200).json({
            message: "delete user successfully!",
          });
        }
        return res.status(400).json({ message: "something went wrong!" });
      })
      .catch((err) => {
        return res.status(500).json({
          message: err,
        });
      });
  } else {
    if (Number(id) === decode?.id) {
      await Knex.table("users")
        .where({ id })
        .delete()
        .then(async (data) => {
          if (data) {
            await Knex.table("products")
              .where({ user_id: decode?.id })
              .delete();
            return res.status(200).json({
              message: "delete user successfully!",
            });
          }
          return res.status(400).json({ message: "something went wrong!" });
        })
        .catch((err) => {
          return res.status(500).json({
            message: err,
          });
        });
    } else {
      return res.status(400).json({ message: "you can not delete user!" });
    }
  }
};
