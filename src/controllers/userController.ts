import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/User";
import { CustomError } from "../middleware/errorHandler";
import { validateUser, validateUserId } from "../middleware/validateUser";

// Create a new user
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  try {
    const newUser: IUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

// Retrieve all users
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users: IUser[] = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Retrieve a user by ID
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: IUser | null = await User.findById(req.params.id);
    if (!user) {
      const error: CustomError = new Error("User not found");
      error.status = 404;
      throw error;
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Update user details by ID
export const updateUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  try {
    const user: IUser | null = await User.findById(req.params.id);
    if (!user) {
      const error: CustomError = new Error("User not found");
      error.status = 404;
      throw error;
    }

    user.name = name;
    user.email = email;
    user.password = password;
    await user.save();
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: IUser | null = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      const error: CustomError = new Error("User not found");
      error.status = 404;
      throw error;
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};
