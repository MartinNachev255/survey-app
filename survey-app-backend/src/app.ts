import express from 'express';
import connectDB from './config/database';
import userRouter from './controllers/user.controller';
import loginRouter from './controllers/login.controller';
import errorHandler from './middlewares/errorHandler';
import surveyRouter from './controllers/survey.controller';
import testingRouter from './controllers/testing.contoller';
import cors from 'cors';
import morgan from 'morgan';
import { stream } from './config/logger';

const app = express();

app.use(express.static('dist'));
app.use(cors());
app.use(express.json());

app.use(morgan('combined', { stream }));

connectDB();

app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/survey', surveyRouter);

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing/resetDB', testingRouter);
}

app.use(errorHandler);

export default app;
