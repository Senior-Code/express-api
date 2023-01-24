import { Request, Response } from "express";
import Knex from "../../database/db";

export default async (req: Request, res: Response) => {
  return res.status(400).json({ message: "something wrong!!!" });
};
