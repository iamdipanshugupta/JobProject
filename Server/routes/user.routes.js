import express from "express";
import upload from "../utils/upload.js";
import verifyToken, { isAdmin } from "../middleware/auth.middleware.js";
import {
  getProfile,
  updateProfile,
  submitEnquiry,
  getAllEnquiries,
  deleteEnquiry,
} from "../controllers/user.controller.js";

const router = express.Router();

// Profile routes (authenticated)
router.get("/me", verifyToken, getProfile);
router.put("/me", verifyToken, upload.single("resume"), updateProfile);

// Enquiry routes
router.post("/enquiry", submitEnquiry);                                  // public: anyone can submit
router.get("/enquiries", verifyToken, isAdmin, getAllEnquiries);          // admin only
router.delete("/enquiry/:id", verifyToken, isAdmin, deleteEnquiry);       // admin only

export default router;
