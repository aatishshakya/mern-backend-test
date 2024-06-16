import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/users";
import errorHandler from "./middleware/errorHandler";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();

const app = express();

// Define the allowed origins
const allowedOrigins = [
  "http://localhost:4000",
  "https://mern-frontend-ashen.vercel.app",
];

// Configure CORS options
const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    if (origin && allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/users", userRoutes);

// Catch-all route for handling 404 errors
app.use((req, res, next) => {
  res.status(404).send("NOT_FOUND");
});

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
