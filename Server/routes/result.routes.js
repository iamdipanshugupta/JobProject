import express from "express";
import { upsertResult, getResultsByJob, getResultsByUser } from "../controllers/result.controller.js";

const router = express.Router();

router.put("/", upsertResult);
router.get("/user/:jobSeekerId", getResultsByUser);
router.get("/:jobId", getResultsByJob);

export default router;