import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  console.log(req.query);
  return res.status(400).json({ message: "something wrong!!!" });
};
