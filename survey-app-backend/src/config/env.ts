import dotenv from 'dotenv';
import logger from './logger';

dotenv.config();

export const PORT = process.env.PORT;

const MONGODB_URI_FROM_ENV = process.env.MONGODB_URI;
if (!MONGODB_URI_FROM_ENV) {
  logger.error(
    'FATAL ERROR: MONGODB_URI is not defined in the enviroment variables',
  );
  process.exit(1);
}
export const MONGODB_URI: string = MONGODB_URI_FROM_ENV;

const SECRET_FROM_ENV = process.env.SECRET;
if (!SECRET_FROM_ENV) {
  logger.error(
    'FATAL ERROR: SECRET is not defined in the enviroment variables',
  );
  process.exit(1);
}
export const SECRET = SECRET_FROM_ENV;

export default { PORT, MONGODB_URI, SECRET };
