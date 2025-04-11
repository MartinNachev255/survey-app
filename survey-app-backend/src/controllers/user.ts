import express, { NextFunction } from 'express';
import User from '../modules/User';
import { Request, Response } from 'express';
import { newUserEntrySchema } from '../validation/user.validation';
import userServices from '../services/user.service';
import { NewUserEntry, NewUserEntryNoPass } from '../types/user.types';

const userRouter = express.Router();

const newUserParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newUserEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

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
