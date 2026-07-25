import express from "express";
import {
  getAllUsers,
  getAllJobSeekers,
  updateUserStatus,
  downloadResume,
} from "../controllers/admin.controller.js";

const router = express.Router();

import verifyToken, { isAdmin } from "../middleware/auth.middleware.js";

router.get("/users", verifyToken, isAdmin, getAllUsers);
router.get("/jobseekers", verifyToken, isAdmin, getAllJobSeekers);
router.patch("/users/:id/status", verifyToken, isAdmin, updateUserStatus);
router.get("/resume/:filename", verifyToken, isAdmin, downloadResume);
export default router;
