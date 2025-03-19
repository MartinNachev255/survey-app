import mongoose from "mongoose";
import dotenv from 'dotenv';
import { MONGODB_URI } from './env.ts'

dotenv.config();

mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error : unknown) {
    if (error instanceof Error) {
      console.log('error connecting to MongoDB: ', error.message);
    }
  }
};

export default connectDB;

