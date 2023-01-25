import { Response, Request } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { config } from "dotenv";
config();

export default (req: Request, res: Response, next: () => void) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send("request forbidden!!!");
  } else {
    jwt.verify(token, process.env.PRIVATE_KEY as Secret, (err: any) => {
      if (err) {
        return res.status(401).send(err.message);
      } else {
        req.query = { token: token };
        next();
      }
    });
  }
};
