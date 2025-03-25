import express from 'express';
import connectDB from './config/database';
const app = express();
import userRouter from './controllers/user.controller';
import loginRouter from './controllers/login.controller';
import errorHandler from './middlewares/errorHandler';
import surveyRouter from './controllers/survey.controller';
import userAuth from './middlewares/userAuth';

app.use(express.json());

connectDB();

app.get('/', (_req, res) => {
  res.send('works');
});

app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/survey', userAuth.tokenExtractor, surveyRouter);
app.use(errorHandler);

export default app;
