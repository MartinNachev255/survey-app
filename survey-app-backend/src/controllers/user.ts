import express, { NextFunction } from 'express'
import User from '../modules/User.ts';
import { Request, Response } from 'express'
import { newUserEnrty, newUserEnrtySchema } from '../validation/user.validation.ts'
import userServices from '../services/user.service.ts'
import { IUser } from '../types/user.types.ts';

const userRouter = express.Router()

const newUserParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newUserEnrtySchema.parse(req.body);
    next()
  } catch (error: unknown) {
    next(error)
  }
}

userRouter.post('/', newUserParser, async (req: Request<unknown, unknown, IUser>, res: Response<IUser>, next: NextFunction) => {
  const addedUser = await userServices.addUser(req.body, next);
  res.json(addedUser);
});

userRouter.get('/', async (_req: Request, res: Response) => {
  const users = await User.find({})

  res.json(users)
})

export default userRouter;