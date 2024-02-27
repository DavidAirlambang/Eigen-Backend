import { borrowBook, returnBook } from "../controllers/loanController";
import { Router } from "express";

const router = Router();
router.post("/borrow", borrowBook);
router.post("/return", returnBook);

export default router;
