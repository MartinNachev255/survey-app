import bcrypt from 'bcrypt';
const userRouter = require('express').Router()
import User from '../modules/User.ts';
import { Request, Response } from 'express'
import { newUserEnrty } from '../validation/user.validation.ts'


userRouter.post('/', async (req: Request, res: Response) => {
  const newUser = newUserEnrty(req.body)

  const saltRound = 10
  const passwordHash = await bcrypt.hash(newUser.password, saltRound)

  const user = new User({
    ...newUser,
    password: passwordHash
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

userRouter.get('/', async (_req: Request, res: Response) => {
  const users = await User.find({})

  res.json(users)
})

export default userRouter; 