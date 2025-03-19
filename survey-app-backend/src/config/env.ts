import dotenv from 'dotenv';

dotenv.config()

export const PORT = process.env.PORT

export const MONGODB_URI: string = process.env.MONGODB_URI as string

export default { PORT, MONGODB_URI }