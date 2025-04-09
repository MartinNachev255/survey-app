import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../modules/User';
import { Request, Response, NextFunction } from 'express';
import { SECRET } from '../config/env';
import { CustomError } from '../utils/customError';
import logger from '../config/logger';

interface CustomRequest extends Request {
  token: string | JwtPayload;
  user?: unknown;
}

const tokenExtractor = (req: Request, _res: Response, next: NextFunction) => {
  logger.debug('Entering tokenExtractor middleware');
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      logger.warn('Authorization token missing');
      throw new CustomError('unauthorized', 401);
    }
    logger.debug('Token extracted successfully');
    (req as CustomRequest).token = token;

    next();
  } catch (error) {
    next(error);
  }
};

const userExtractor = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  logger.debug('Entering userExtractor middleware');

  try {
    logger.debug('Attempting to verify and decode token');
    const decodedToken = jwt.verify(
      (req as CustomRequest).token as string,
      SECRET,
    );

    if (typeof decodedToken !== 'object' || !('id' in decodedToken)) {
      logger.warn('Token verification failed or token has invalid');
      throw new CustomError('token invalid', 401);
    }

    if (typeof decodedToken === 'object' && 'id' in decodedToken) {
      const user = await User.findById(decodedToken.id);
      if (!user) {
        logger.warn('User specified in token not found in database');
        throw new CustomError('user not found', 401);
      }

      logger.debug('User found and attached to request', { userID: user.id });
      (req as CustomRequest).user = user;
    } else {
      res.status(401).json({ error: 'token invalid' });
    }

    next();
    return;
  } catch (error) {
    next(error);
  }
};

export default {
  tokenExtractor,
  userExtractor,
};
