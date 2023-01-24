import { Router } from "express";
import loginAdmin from "../function/admin/loginAdmin";

const router = Router();

router.post("/", loginAdmin);

export default router;
