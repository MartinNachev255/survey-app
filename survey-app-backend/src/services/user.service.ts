import bcrypt from 'bcrypt'
import { IUser } from "../types/user.types";
import User from '../modules/User';
import { NextFunction } from 'express';

const addUser = async ( user: IUser, next: NextFunction) => {
  try {
    const saltRound = 10
    const passwordHash = await bcrypt.hash(user.password, saltRound)
    
    const newUser = new User({
      ...user,
      password: passwordHash
    })

    const savedUser = await newUser.save()

    return savedUser
  } catch (error) {
    next(error)
  }
} 

export default {
  addUser
}