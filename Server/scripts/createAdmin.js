import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/user.model.js"; // correct path

dotenv.config(); // load .env

// Use MONGO_URI from .env
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

async function createAdmin() {
  try {
    const existingAdmin = await User.findOne({ email: "admin@example.com" });
    if (existingAdmin) {
      console.log("Admin user already exists!");
      mongoose.connection.close();
      return;
    }

    const hashedPassword = await bcrypt.hash("Admin123", 10);

    const admin = new User({
      username: "Admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin"
    });

    await admin.save();
    console.log("Admin user created successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error creating admin:", err);
    mongoose.connection.close();
  }
}

createAdmin();
