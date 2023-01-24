import express from "express";
import { config } from "dotenv";
import usersRouter from "./routes/users";
import productsRouter from "./routes/products";
import adminRouter from "./routes/login";
config();

const app = express();
const port = process.env.PORT;
app.use(express.json());

app.use("/api/login", adminRouter);

app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
