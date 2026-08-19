import express from "express";
import verifyToken, { isAdmin } from "../middleware/auth.middleware.js";
import {
  getAllUsers,
  getAllJobSeekers,
  updateUserStatus,
  downloadResume,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/users", verifyToken, isAdmin, getAllUsers);
router.get("/jobseekers", verifyToken, isAdmin, getAllJobSeekers);
router.patch("/users/:id/status", verifyToken, isAdmin, updateUserStatus);
router.get("/resume/:filename", verifyToken, isAdmin, downloadResume);

export default router;
