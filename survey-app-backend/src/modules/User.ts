import mongoose, { Schema, model } from 'mongoose';
import { IUser } from '../types/user.types';

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  name: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
  },
  surveys: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: `Survey`,
    },
  ],
});

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    const { _id, __v, password, ...rest } = returnedObject;
    return {
      ...rest,
      id: _id.toString(),
    };
  },
});

const User = model<IUser>('User', userSchema);

export default User;
