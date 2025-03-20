import express, { NextFunction } from 'express';
import User from '../modules/User';
import { Request, Response } from 'express';
import { newUserEnrtySchema } from '../validation/user.validation';
import userServices from '../services/user.service';
import { IUser } from '../types/user.types';

const userRouter = express.Router();

const newUserParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newUserEnrtySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

userRouter.post(
  '/',
  newUserParser,
  async (
    req: Request<unknown, unknown, IUser>,
    res: Response<IUser>,
    next: NextFunction,
  ) => {
    const addedUser = await userServices.addUser(req.body, next);
    res.status(200).json(addedUser);
  },
);

userRouter.get('/', async (_req: Request, res: Response) => {
  const users = await User.find({});

  res.json(users);
});

export default userRouter;
