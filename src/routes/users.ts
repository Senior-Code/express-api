import { Router } from "express";
import createUser from "../function/users/createUser";
import deleteMyUser from "../function/users/deleteMyUser";
import deleteUser from "../function/users/deleteUser";
import readUser from "../function/users/readUser";
import updateUser from "../function/users/updateUser";
import userList from "../function/users/userList";

const router = Router();
router
  .get("/", userList)
  .post("/", createUser)
  .delete("/", deleteMyUser)
  .get("/:id", readUser)
  .put("/:id", updateUser)
  .delete("/:id", deleteUser);

export default router;
