import bcrypt from 'bcrypt';
import { NewUserEnrty } from '../types/user.types';
import User from '../modules/User';
import { NextFunction } from 'express';
import logger from '../config/logger';

const addUser = async (user: NewUserEnrty, next: NextFunction) => {
  try {
    const saltRound = 10;
    const passwordHash = await bcrypt.hash(user.password, saltRound);

    const newUser = new User({
      ...user,
      password: passwordHash,
    });

    logger.debug(`Attempting to save ${user} to database`);
    const savedUser = await newUser.save();
    logger.debug('User saved successfully');

    return savedUser;
  } catch (error) {
    next(error);
    return;
  }
};

export default {
  addUser,
};
