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
    required: true,
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
  transform: (_document, retrurnedObject) => {
    retrurnedObject.id = retrurnedObject._id.toString();
    delete retrurnedObject._id;
    delete retrurnedObject.__v;
    delete retrurnedObject.passwordHash;
  },
});

const User = model<IUser>('User', userSchema);

export default User;
