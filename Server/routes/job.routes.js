import express from "express";
import verifyToken, { isAdmin } from "../middleware/auth.middleware.js";
import { getJobs, createJob, updateJob, deleteJob } from "../controllers/job.controller.js";

const router = express.Router();

router.get("/", getJobs);                              // public: anyone can browse jobs
router.post("/", verifyToken, isAdmin, createJob);      // admin only
router.put("/:id", verifyToken, isAdmin, updateJob);    // admin only
router.delete("/:id", verifyToken, isAdmin, deleteJob); // admin only

export default router;
