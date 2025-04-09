import express, { Request, Response, NextFunction } from 'express';
import { NewSurveyEntry, ISurvey } from '../types/survey.types';
import userAuth from '../middlewares/userAuth';
import surveyService from '../services/survey.service';
import { IUser } from '../types/user.types';
import { JwtPayload } from 'jsonwebtoken';
import {
  newSurveyParser,
  newAnswersEntryParser,
} from '../utils/validationParsers';

const surveyRouter = express.Router();

interface CustomRequest extends Request {
  token: string | JwtPayload;
  id: string;
  user?: unknown;
}

surveyRouter.get(
  '/',
  async (_req: Request, res: Response<ISurvey[]>, next: NextFunction) => {
    const surveys = await surveyService.getAllSurveys(next);
    if (surveys) res.status(200).json(surveys);
  },
);

surveyRouter.get(
  '/:id',
  async (req: Request, res: Response<ISurvey>, next: NextFunction) => {
    const survey = await surveyService.getSurveyById(req.params.id, next);
    if (survey) res.status(200).json(survey);
  },
);

surveyRouter.post(
  '/',
  newSurveyParser,
  userAuth.tokenExtractor,
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

surveyRouter.put(
  '/:id',
  newSurveyParser,
  userAuth.tokenExtractor,
  userAuth.userExtractor,
  async (
    req: Request<{ id: string }, unknown, NewSurveyEntry>,
    res: Response,
    next: NextFunction,
  ) => {
    const updatedSurvey = await surveyService.updateSurvey(
      req.params.id,
      req.body,
      (req as unknown as CustomRequest).user as IUser,
      next,
    );

    if (updatedSurvey) {
      res.status(200).json({
        success: true,
        updatedSurveyID: updatedSurvey?.id,
      });
    }
  },
);

surveyRouter.delete(
  '/:id',
  userAuth.tokenExtractor,
  userAuth.userExtractor,
  async (req: Request, res: Response, next: NextFunction) => {
    const surveyIsDeleted = await surveyService.deleteSurvey(
      req.params.id,
      (req as CustomRequest).user as IUser,
      next,
    );

    if (surveyIsDeleted) res.status(204).end();
  },
);

surveyRouter.post(
  '/:id/respond',
  userAuth.tokenExtractor,
  newAnswersEntryParser,
  async (req: Request, res: Response, next: NextFunction) => {
    const surveyID = req.params.id;

    const updatedAnswers = await surveyService.incrementAnswers(
      surveyID,
      req.body,
      next,
    );

    res.status(200).json({
      success: true,
      modifiedContent: updatedAnswers?.modifiedCount,
    });
  },
);

export default surveyRouter;
