import express, { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/User";
import { CustomError } from "../middleware/errorHandler";
import { validateUser, validateUserId } from "../middleware/validateUser";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../controllers/userController";

const router = express.Router();

// Create a new user
router.post("/", validateUser, createUser);

// Retrieve all users
router.get("/", getAllUsers);

// Retrieve a user by ID
router.get("/:id", validateUserId, getUserById);

// Update user details by ID
router.put("/:id", [validateUserId, validateUser], updateUserById);

// Delete a user by ID
router.delete("/:id", validateUserId, deleteUserById);

export default router;
