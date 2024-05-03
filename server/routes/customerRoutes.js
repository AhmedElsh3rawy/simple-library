import { Router } from "express";
import {
  getCustomerById,
  register,
  login,
} from "../controllers/customerController.js";

const router = Router();

router.get("/:customerId", getCustomerById);

router.post("/register", register);

router.post("/login", login);

export default router;
