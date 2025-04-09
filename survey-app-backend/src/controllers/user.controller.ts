import express, { NextFunction } from 'express';
import User from '../modules/User';
import { Request, Response } from 'express';
import userServices from '../services/user.service';
import { NewUserEnrty } from '../types/user.types';
import { newUserParser } from '../utils/validationParsers';

const userRouter = express.Router();

userRouter.post(
  '/',
  newUserParser,
  async (
    req: Request<unknown, unknown, NewUserEnrty>,
    res: Response<NewUserEnrty>,
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
