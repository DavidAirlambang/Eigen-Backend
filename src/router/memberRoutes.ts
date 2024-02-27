import { Router } from "express";
import {
  createMember,
  getAllMembers,
  updateMember,
} from "../controllers/memberController";

const router = Router();
router.route("/").get(getAllMembers).post(createMember);
router.route("/:code").patch(updateMember);

export default router;
