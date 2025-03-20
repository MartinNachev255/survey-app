import express from 'express';
import connectDB from './config/database.ts';
const app = express();
import userRouter from './controllers/user.ts';
import errorHandler from './middlewares/errorHandler.ts'

app.use(express.json());

connectDB()

app.get('/', (_req, res) => {
  res.send('works')
})

app.use('/api/users', userRouter)
app.use(errorHandler);

export default app;