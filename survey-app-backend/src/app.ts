import express from 'express';
import connectDB from './config/database';
const app = express();
import userRouter from './controllers/user.controller';
import loginRouter from './controllers/login.controller';
import errorHandler from './middlewares/errorHandler';

app.use(express.json());

connectDB();

app.get('/', (_req, res) => {
  res.send('works');
});

app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use(errorHandler);

export default app;
