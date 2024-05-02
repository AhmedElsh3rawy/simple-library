import { Router } from "express";
import { getBooks, getBookById } from "../controllers/bookContorller.js";

const router = Router();

router.get("/", getBooks);

router.get("/:bookId", getBookById);

export default router;
