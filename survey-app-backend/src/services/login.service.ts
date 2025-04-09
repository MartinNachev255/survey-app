import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../modules/User';
import { LoginUser } from '../types/user.types';
import { NextFunction } from 'express';
import { CustomError } from '../utils/customError';
import { SECRET } from '../config/env';
import logger from '../config/logger';

const loginUser = async (user: LoginUser, next: NextFunction) => {
  try {
    logger.debug(`Login attempt for username: ${user.username}`);

    const userToLogin = await User.findOne({ username: user.username });
    logger.debug(`User found: ${!!userToLogin}`);

    const passwordCorrect =
      userToLogin === null
        ? false
        : await bcrypt.compare(user.password, userToLogin.password);

    logger.debug(`Password verification result: ${passwordCorrect}`);

    if (!(userToLogin && passwordCorrect)) {
      logger.debug(
        `Login failed for username: ${user.username} - Invalid credentials`,
      );
      throw new CustomError('Invalid username or password', 400);
    }

    const userForToken = {
      username: userToLogin.username,
      id: userToLogin._id,
    };

    const token = jwt.sign(userForToken, SECRET, { expiresIn: '2h' });
    logger.info(`User ${user.username} logged in successfully`);

    return { token, username: userToLogin.username, name: userToLogin.name };
  } catch (error) {
    next(error);
    return;
  }
};

export default {
  loginUser,
};
