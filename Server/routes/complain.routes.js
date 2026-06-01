import express from "express";
import {
  submitComplaint,
  getAllComplaints,
  updateComplaintStatus,
  deleteComplaint,
} from "../controllers/complaint.controller.js";

const router = express.Router();

router.post("/", submitComplaint);
router.get("/", getAllComplaints);
router.put("/:id", updateComplaintStatus);
router.delete("/:id", deleteComplaint);

export default router;