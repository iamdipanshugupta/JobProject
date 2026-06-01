import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import userModel from "../models/user.model.js"; // path adjust karo

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");

    const users = await userModel.find({});
    for (let user of users) {
      // Skip already hashed passwords (bcrypt hashes ~60 chars)
      if (user.password.length !== 60) {
        const hashed = await bcrypt.hash(user.password, 10);
        user.password = hashed;
        await user.save();
        console.log(`Password updated for ${user.email}`);
      }
    }

    console.log("All passwords hashed!");
    process.exit();
  })
  .catch(err => {
    console.log("MongoDB connection error:", err);
    process.exit(1);
  });
