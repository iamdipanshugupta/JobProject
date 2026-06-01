import express from "express";
import verifyToken from "../middleware/auth.js"; // ✅ default import

const router = express.Router();

router.get("/dashboard", verifyToken, (req, res) => {
  res.json({
    success: true,
    message: `Hello user ${req.userId}, you accessed a protected route!`
  });
});

export default router;
