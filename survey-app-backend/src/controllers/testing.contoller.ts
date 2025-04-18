import express, { Request, Response } from 'express';
import User from '../modules/User';
import Survey from '../modules/Survey';

const testingRouter = express.Router();

if (process.env.NODE_ENV === 'test') {
  testingRouter.post('', async (_req: Request, res: Response) => {
    await User.deleteMany({});
    await Survey.deleteMany({});

    res.status(204).end();
  });
}

export default testingRouter;
