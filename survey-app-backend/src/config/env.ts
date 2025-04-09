import dotenv from 'dotenv';
import logger from './logger';

dotenv.config();

export const PORT = process.env.PORT;

const NODE_ENV: string | undefined = process.env.NODE_ENV;

let MONGODB_URI_FROM_ENV: string | undefined;

if (NODE_ENV === 'production') {
  MONGODB_URI_FROM_ENV = process.env.MONGODB_URI_PROD;
} else if (NODE_ENV === 'test') {
  MONGODB_URI_FROM_ENV = process.env.MONGODB_URI_TEST;
} else {
  MONGODB_URI_FROM_ENV = process.env.MONGODB_URI_DEV;
}

if (!MONGODB_URI_FROM_ENV) {
  logger.error(
    'FATAL ERROR: MONGODB_URI is not defined in the environment variables',
  );
  process.exit(1);
}
export const MONGODB_URI: string = MONGODB_URI_FROM_ENV;

const SECRET_FROM_ENV = process.env.SECRET;
if (!SECRET_FROM_ENV) {
  logger.error(
    'FATAL ERROR: SECRET is not defined in the environment variables',
  );
  process.exit(1);
}
export const SECRET = SECRET_FROM_ENV;

export default { PORT, MONGODB_URI, SECRET };
