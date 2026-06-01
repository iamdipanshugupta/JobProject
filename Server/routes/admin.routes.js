import express from "express";
import {
  getAllUsers,
  getAllJobSeekers,
  updateUserStatus,
  downloadResume,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/jobseekers", getAllJobSeekers);
router.patch("/users/:id/status", updateUserStatus);
router.get("/resume/:filename", downloadResume);

export default router;
