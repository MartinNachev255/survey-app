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
) => {
  logger.error({ err });

  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ error: err.message });
  } else if (
    err instanceof mongoose.mongo.MongoServerError &&
    err.message.includes('E11000 duplicate key error')
  ) {
    const keyValue = err.keyValue;
    res.status(400).json({ error: `Duplicate key`, keyValue });
  } else if (err instanceof ZodError) {
    res.status(400).json({ error: err.flatten() });
  } else if (err.message.includes('jwt expired')) {
    res.status(401).json({ error: 'Expired token' });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default errorHandler;
