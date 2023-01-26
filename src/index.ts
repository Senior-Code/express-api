import express from "express";
import { config } from "dotenv";
import usersRouter from "./routes/users";
import productsRouter from "./routes/products";
import adminRouter from "./routes/login";
import authentication from "./middleware/authentication";
import meRouter from "./routes/me";
config();

const app = express();
const port = process.env.PORT;
app.use(express.json());

app.use("/api/login", adminRouter);
app.use("/api/user", authentication, usersRouter);
app.use("/api/product", authentication, productsRouter);
app.use("/api/me", authentication, meRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}/api`);
});
