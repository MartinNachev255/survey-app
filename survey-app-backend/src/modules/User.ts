import { Schema, model } from "mongoose";
import { IUser } from '../types/user.types.ts';

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, minlength: 3 },
  name: { type: String, required: true },
  password: { type: String, required: true, minlength: 3 },
})

const User = model<IUser>('User', userSchema)

export default User;