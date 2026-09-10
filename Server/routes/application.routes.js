import express from "express";
import upload from "../utils/upload.js";
import verifyToken, { isAdmin } from "../middleware/auth.middleware.js";
import {
  applyForJob,
  getMyApplications,
  getAllApplications,
  getApplicantsForJob,
  updateApplicationStatus,
  deleteApplication,
} from "../controllers/application.controller.js";

const router = express.Router();

// JobSeeker (identity comes from the verified token, not from the request body/query)
router.post("/", verifyToken, upload.single("resume"), applyForJob);
router.get("/my", verifyToken, getMyApplications);

// Admin
router.get("/all", verifyToken, isAdmin, getAllApplications);
router.get("/", verifyToken, isAdmin, getApplicantsForJob);
router.put("/:id/status", verifyToken, isAdmin, updateApplicationStatus);
router.delete("/:id", verifyToken, isAdmin, deleteApplication);

export default router;
