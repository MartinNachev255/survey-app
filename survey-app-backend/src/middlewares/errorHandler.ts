import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { CustomError } from '../utils/customError';
import mongoose from 'mongoose';
import logger from '../config/logger';

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const statusCode = err instanceof CustomError ? err.statusCode : 500;
  const message = err.message || 'Internal Server Error';

  logger.error(`Error: ${message}, Status Code: ${statusCode}`, { error: err });

  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  } else if (
    err instanceof mongoose.mongo.MongoServerError &&
    err.message.includes('E11000 duplicate key error')
  ) {
    const keyValue = err.keyValue;
    res.status(400).json({
      success: false,
      message: 'Duplicate key',
      keyValue,
    });
  } else if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: 'Validation error',
      details: err.flatten(),
    });
  } else if (err.message.includes('jwt expired')) {
    res.status(401).json({
      success: false,
      message: 'Expired token',
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export default errorHandler;
