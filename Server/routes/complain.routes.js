import express from "express";
import verifyToken, { isAdmin } from "../middleware/auth.middleware.js";
import {
  submitComplaint,
  getAllComplaints,
  updateComplaintStatus,
  deleteComplaint,
} from "../controllers/complaint.controller.js";

const router = express.Router();

router.post("/", submitComplaint);                              // public: anyone can submit
router.get("/", verifyToken, isAdmin, getAllComplaints);         // admin only
router.put("/:id", verifyToken, isAdmin, updateComplaintStatus); // admin only
router.delete("/:id", verifyToken, isAdmin, deleteComplaint);    // admin only

export default router;
