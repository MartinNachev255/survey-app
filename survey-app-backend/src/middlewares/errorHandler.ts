import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { CustomError } from "../utils/customError";
import { MongoServerError } from "mongodb";

const errorHandler: ErrorRequestHandler = (
  err,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error("Error:", err);

  let statusCode = 500;
  let message = "Something went wrong!";

  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  else if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0]; // Get the field name
    message = `Duplicate value for field: ${field}, please use a different one.`;
  }

  else if (err instanceof ZodError) {
    statusCode = 400;
    res.status(statusCode).json({ error: err.flatten() });
    return;
  }

  res.status(statusCode).json({ error: message });
};

export default errorHandler;
