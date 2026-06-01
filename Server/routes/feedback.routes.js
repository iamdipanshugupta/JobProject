import express from "express";
import verifyToken from "../middleware/auth.middleware.js";
import { submitFeedback, getAllFeedback, deleteFeedback } from "../controllers/feedbackController.js";

const router = express.Router();

router.post("/", verifyToken, submitFeedback);
router.get("/", verifyToken, getAllFeedback);
router.delete("/:id", verifyToken, deleteFeedback);

export default router;