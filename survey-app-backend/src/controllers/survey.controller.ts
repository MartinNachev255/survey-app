import express, { Request, Response, NextFunction } from 'express';
import { newSurveyEntrySchema } from '../validation/survey.validation';
import { NewSurveyEntry } from '../types/survey.types';
import userAuth from '../middlewares/userAuth';
import surveyService from '../services/survey.service';
import { IUser } from '../types/user.types';
import { JwtPayload } from 'jsonwebtoken';

const surveyRouter = express.Router();

interface CustomRequest extends Request {
  token: string | JwtPayload;
  user?: unknown;
}

const newSurveyParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newSurveyEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

surveyRouter.post(
  '/',
  newSurveyParser,
  userAuth.userExtractor,
  async (
    req: Request<unknown, unknown, NewSurveyEntry>,
    res: Response<NewSurveyEntry>,
    next: NextFunction,
  ) => {
    const addedSurvey = await surveyService.createNewSurvey(
      req.body,
      (req as CustomRequest).user as IUser,
      next,
    );
    res.status(200).json(addedSurvey);
  },
);

export default surveyRouter;
