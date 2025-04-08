import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../modules/User';
import { LoginUser } from '../types/user.types';
import { NextFunction } from 'express';
import { CustomError } from '../utils/customError';
import { SECRET } from '../config/env';

const loginUser = async (user: LoginUser, next: NextFunction) => {
  try {
    const userToLogin = await User.findOne({ username: user.username });
    const passwordCorrect =
      userToLogin === null
        ? false
        : await bcrypt.compare(user.password, userToLogin.password);

    if (!(userToLogin && passwordCorrect)) {
      throw new CustomError('invalid username or password', 400);
    }

    const userForToken = {
      username: userToLogin.username,
      id: userToLogin._id,
    };

    const token = jwt.sign(userForToken, SECRET, { expiresIn: '2h' });

    return { token, username: userToLogin.username, name: userToLogin.name };
  } catch (error) {
    next(error);
    return;
  }
};

export default {
  loginUser,
};
