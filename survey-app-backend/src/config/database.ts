import mongoose from 'mongoose';
import { MONGODB_URI } from './env';
import logger from './logger';

mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    logger.info('Connected to MongoDB');
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error(`Error connecting to MongoDB: `, { error });
    }
  }
};

export default connectDB;
