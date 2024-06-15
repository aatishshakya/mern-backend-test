import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be valid",
    "string.empty": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "string.empty": "Password is required",
  }),
});

const userIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.length": "Invalid user ID",
    "string.empty": "User ID is required",
  }),
});

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateUserId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = userIdSchema.validate(req.params);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
