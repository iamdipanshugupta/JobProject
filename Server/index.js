import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDatabase from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import jobRoutes from "./routes/job.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import resultRoutes from "./routes/result.routes.js";
import complainRoutes from "./routes/complain.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";
import adminRoutes from "./routes/admin.routes.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://job-project-one.vercel.app",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json());

// Connect to DB
connectDatabase();

// Health check
app.get("/", (req, res) => {
  res.json({ message: "jobSeeker is running", status: "ok" });
});

// Routes
app.use("/api/auth", authRoutes);          // login, register, forgot/reset password
app.use("/api/users", userRoutes);          // user profile, admin user management
app.use("/api/jobs", jobRoutes);            // job CRUD
app.use("/api/applications", applicationRoutes); // job applications
app.use("/api/results", resultRoutes);      // result management
app.use("/api/complaints", complainRoutes); // complaints
app.use("/api/feedback", feedbackRoutes);   // feedback
app.use("/api/admin", adminRoutes);         // admin-specific operations

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;