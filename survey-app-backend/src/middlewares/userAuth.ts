import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../modules/User';
import { Request, Response, NextFunction } from 'express';
import { SECRET } from '../config/env';
import { CustomError } from '../utils/customError';

interface CustomRequest extends Request {
  token: string | JwtPayload;
  user?: unknown;
}

const tokenExtractor = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new CustomError('unauthorized', 401);
    }

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
  try {
    const decodedToken = jwt.verify(
      (req as CustomRequest).token as string,
      SECRET,
    );
    if (typeof decodedToken !== 'object' || !('id' in decodedToken)) {
      res.status(401).json({ error: 'token invalid' });
    }

    if (typeof decodedToken === 'object' && 'id' in decodedToken) {
      const user = await User.findById(decodedToken.id);
      if (!user) {
        res.status(401).json({ error: 'user not found' });
      }
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
