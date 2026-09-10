import express from "express";
import verifyToken, { isAdmin } from "../middleware/auth.middleware.js";
import { upsertResult, getResultsByJob, getResultsByUser } from "../controllers/result.controller.js";

const router = express.Router();

router.put("/", verifyToken, isAdmin, upsertResult);
router.get("/user/:jobSeekerId", verifyToken, isAdmin, getResultsByUser);
router.get("/:jobId", verifyToken, isAdmin, getResultsByJob);

export default router;
