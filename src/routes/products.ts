import { Router } from "express";
import createProduct from "../function/products/createProduct";
import deleteProduct from "../function/products/deleteProduct";
import productList from "../function/products/productList";
import productListAll from "../function/products/productListAll";
import readProduct from "../function/products/readProduct";
import updateProduct from "../function/products/updateProduct";

const router = Router();
router
  .get("/list", productListAll)
  .get("/", productList)
  .post("/", createProduct)
  .get("/:id", readProduct)
  .put("/:id", updateProduct)
  .delete("/:id", deleteProduct);

export default router;
