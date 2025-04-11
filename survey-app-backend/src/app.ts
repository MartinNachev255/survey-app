import express from 'express';
import connectDB from './config/database';
import userRouter from './controllers/user.controller';
import loginRouter from './controllers/login.controller';
import errorHandler from './middlewares/errorHandler';
import surveyRouter from './controllers/survey.controller';
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
app.use(errorHandler);

export default app;
