import { Request, Response, NextFunction } from "express";

export interface CustomError extends Error {
  status?: number;
}

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.status || 500;
  res
    .status(statusCode)
    .json({ error: err.message || "Internal Server Error" });
};

export default errorHandler;
