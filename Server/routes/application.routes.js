import express from "express";
import upload from "../utils/upload.js";
import {
  applyForJob,
  getMyApplications,
  getAllApplications,
  getApplicantsForJob,
  updateApplicationStatus,
  deleteApplication,
} from "../controllers/application.controller.js";

const router = express.Router();

// JobSeeker
router.post("/", upload.single("resume"), applyForJob);
router.get("/my", getMyApplications);

// Admin
router.get("/all", getAllApplications);
router.get("/", getApplicantsForJob);
router.put("/:id/status", updateApplicationStatus);
router.delete("/:id", deleteApplication);

export default router;