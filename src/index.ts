import express from "express";
import { config } from "dotenv";
config();

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});
app.get("/user", (req, res) => {});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}/api`);
});