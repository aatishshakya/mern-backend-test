// src/config/db.ts
import mongoose from "mongoose";

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/mern-ts")
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error.message);
    });

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
  });
};

export default connectDB;
