import express, { Request, Response, NextFunction } from 'express';
import { LoginUser } from '../types/user.types';
import { LoginUserSchema } from '../validation/loginUser.validation';
import loginServices from '../services/login.service';

const loginRouter = express.Router();

const LoginUserParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    LoginUserSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

loginRouter.post(
  '/',
  LoginUserParser,
  async (
    req: Request<unknown, unknown, LoginUser>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userToLogin = await loginServices.loginUser(req.body, next);
      if (userToLogin) {
        res.status(200).json(userToLogin);
      }
    } catch (error) {
      next(error);
    }
  },
);

export default loginRouter;
