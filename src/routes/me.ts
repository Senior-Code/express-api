import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/", async (req, res) => {
  const { token } = req.query;
  if (!token) return res.status(401).send("request forbidden!!!");
  const decode = jwt.decode(token as string, {
    json: true,
  });
  return res.status(200).json({
    data: {
      me: decode,
    },
  });
});

export default router;
