import bcrypt from 'bcrypt';
import { NewUserEntry } from '../types/user.types';
import User from '../modules/User';
import logger from '../config/logger';
import jwt from 'jsonwebtoken';
import { SECRET } from '../config/env';

const addUser = async (user: NewUserEntry) => {
  const saltRound = 10;
  const passwordHash = await bcrypt.hash(user.password, saltRound);

  const newUser = new User({
    ...user,
    password: passwordHash,
  });

  logger.debug(`Attempting to save ${newUser} to database`);
  const savedUser = await newUser.save();
  logger.debug('User saved successfully');

  const userForToken = {
    username: savedUser.username,
    id: savedUser._id,
  };

  const token = jwt.sign(userForToken, SECRET, { expiresIn: '2h' });
  logger.info(`User ${user.username} logged in successfully`);

  return { token, username: savedUser.username, name: savedUser.name };
};

export default {
  addUser,
};
