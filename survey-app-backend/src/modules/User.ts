import { Schema, model } from "mongoose";
import { IUser } from '../types/user.types.ts';

const userSchema = new Schema<IUser>({
  username: { 
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 3
  },
})

userSchema.set('toJSON', {
  transform: (_document, retrurnedObject) => {
    retrurnedObject.id = retrurnedObject._id.toString()
    delete retrurnedObject._id
    delete retrurnedObject.__v
    delete retrurnedObject.passwordHash
  }
})

const User = model<IUser>('User', userSchema)

export default User;