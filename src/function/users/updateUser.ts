import { Request, Response } from "express";
import Knex from "../../database/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default async (req: Request, res: Response) => {
  const { id } = req.params;
  const { token } = req.query;
  const { name, username, password } = req.body;
  if (!token) return res.status(400).send("request forbidden!!!");
  const decode = jwt.decode(token as string, {
    json: true,
  });
  const encryptedPassword = bcrypt.hash(password || "", 12);
  if (decode?.type === "admin") {
    await Knex.table("users")
      .where({ id })
      .update({
        name,
        username,
        password: password ? encryptedPassword : undefined,
      })
      .then((data) => {
        if (data) {
          return res.status(200).json({
            message: "user update successfully!",
          });
        }
        return res.status(400).json({ message: "something went wrong!" });
      })
      .catch((err) => {
        return res.status(500).json({ message: err });
      });
  } else {
    if (Number(id) === decode?.id) {
      await Knex.table("users")
        .where({ id })
        .update({
          name,
          username,
          password: password ? encryptedPassword : undefined,
        })
        .then((data) => {
          if (data) {
            return res.status(200).json({
              message: "user update successfully!",
            });
          }
          return res.status(400).json({ message: "something went wrong!" });
        })
        .catch((err) => {
          return res.status(500).json({ message: err });
        });
    } else {
      return res.status(400).json({ message: "you can not update this user!" });
    }
  }
};
