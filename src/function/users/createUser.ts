import { Request, Response } from "express";
import Knex from "../../database/db";
import bcrypt from "bcrypt";

export default async (req: Request, res: Response) => {
  const { name, username, password } = req.body;
  if (!name || !username || !password)
    return res.status(400).json({ message: "input required fields!" });
  const exist = await Knex.table("users").where({ name }).first();
  if (exist) {
    return res.status(409).json({ message: "user already exist!" });
  } else {
    const encryptedPassword = await bcrypt.hash(password, 12);
    await Knex.table("users")
      .insert({
        name,
        username,
        password: encryptedPassword,
      })
      .then((data) => {
        if (data) {
          return res.status(201).json({ message: "create user successfully!" });
        }
        return res.status(400).json({ message: "something went wrong!" });
      })
      .catch((err) => {
        return res.status(400).json({ message: err });
      });
  }
};
