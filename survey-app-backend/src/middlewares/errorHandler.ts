import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { CustomError } from '../utils/customError';

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error('Error:', err);

  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ error: err.message });
  } else if (
    err.name === 'MongoServerError' &&
    err.message.includes('E11000 duplicate key error')
  ) {
    res.status(400).json({ error: err.message });
  } else if (err instanceof ZodError) {
    res.status(400).json({ error: err.flatten() });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default errorHandler;
