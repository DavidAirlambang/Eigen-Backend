import { Router } from "express";
import {
  createBook,
  getAllBooks,
  updateBook,
} from "../controllers/bookController";

const router = Router();
router.route("/").get(getAllBooks).post(createBook);
router.route("/:code").patch(updateBook);

export default router;
