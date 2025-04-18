import express, { NextFunction, Request, Response } from 'express';
import User from '../modules/User';
import userServices from '../services/user.service';
import { NewUserEntry, NewUserEntryNoPass } from '../types/user.types';
import { newUserParser } from '../utils/validationParsers';

const userRouter = express.Router();

userRouter.post(
  '/',
  newUserParser,
  async (
    req: Request<unknown, unknown, NewUserEntry>,
    res: Response<NewUserEntryNoPass>,
    next: NextFunction,
  ) => {
    try {
      const addedUser = await userServices.addUser(req.body);
      res.status(200).json(addedUser);
    } catch (error) {
      next(error);
    }
  },
);

userRouter.get('/', async (_req: Request, res: Response) => {
  const users = await User.find({});

  res.json(users);
});

export default userRouter;
