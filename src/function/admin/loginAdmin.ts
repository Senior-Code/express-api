import { Request, Response } from "express";
import Knex from "../../database/db";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { config } from "dotenv";
config();

export default async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const result = await Knex.table("users")
    .andWhere({ username })
    .first("id", "name", "username", "password", "type");
  const match = await bcrypt.compare(password, result.password);
  if (!result || !match)
    return res.status(401).json({
      message: "incorrect username or password",
    });
  if (match) {
    delete result.password;
    const data = result;
    var token = jwt.sign(data, process.env.PRIVATE_KEY as Secret);
    await Knex.table("users").where({ id: result.id }).update({ token });
    return res.status(200).json({
      token: token,
    });
  }
  return res.status(400).json({ message: "something wrong!!!" });
};
