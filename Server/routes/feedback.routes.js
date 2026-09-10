import express from "express";
import verifyToken, { isAdmin } from "../middleware/auth.middleware.js";
import { submitFeedback, getAllFeedback, deleteFeedback } from "../controllers/feedbackController.js";

const router = express.Router();

router.post("/", verifyToken, submitFeedback);              // any logged-in user can submit
router.get("/", verifyToken, isAdmin, getAllFeedback);       // admin only
router.delete("/:id", verifyToken, isAdmin, deleteFeedback); // admin only

export default router;